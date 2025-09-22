import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { Club, Member, ClubWithMembers } from '@/lib/database/types'
import { ContractService, ClubContracts } from './contract-service'

export interface MembershipResult {
  member: Member
  transactionSignature: string
  tokensReceived: number
  ownershipPercentage: number
}

export class ClubService {
  // Get all clubs
  static async getClubs(): Promise<Club[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty clubs array')
      return []
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching clubs:', error)
      throw error
    }

    return data || []
  }

  // Get club by ID with members
  static async getClubById(id: string): Promise<ClubWithMembers | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null')
      return null
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select(`
        *,
        members (
          *,
          user_profiles (*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching club:', error)
      return null
    }

    return {
      ...data,
      member_count: data.members?.length || 0
    }
  }

  // Create a new club with smart contracts
  static async createClub(clubData: {
    name: string
    description?: string
    created_by: string
    join_price?: number
  }): Promise<Club> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    try {
      // Deploy smart contracts for the club
      const contracts = await ContractService.deployClubContracts({
        name: clubData.name,
        description: clubData.description || '',
        initialPrice: clubData.join_price || 0
      })

      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from('clubs')
        .insert([{
          ...clubData,
          treasury_address: contracts.treasuryAddress,
          membership_token_mint: contracts.membershipTokenMint,
          contract_deployed: true,
          join_price: clubData.join_price || 0
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating club:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Error creating club with contracts:', error)
      throw new Error('Failed to create club')
    }
  }

  // Join a club with Web3 contribution
  static async joinClub(
    clubId: string,
    userId: string,
    contributionAmount: number,
    walletAddress: string,
    transactionSignature: string
  ): Promise<MembershipResult> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    try {
      // Get club details
      const club = await this.getClubById(clubId)
      if (!club) throw new Error('Club not found')

      // Calculate platform fee and net contribution
      const netContribution = await ContractService.collectPlatformFee(contributionAmount)

      // Calculate tokens and ownership percentage
      const tokensReceived = netContribution // 1:1 ratio for now
      const totalTokensAfter = (club.treasury_balance || 0) + netContribution
      const ownershipPercentage = totalTokensAfter > 0 ? (tokensReceived / totalTokensAfter) * 100 : 100

      const supabase = getSupabaseClient()
      const { data: member, error } = await supabase
        .from('members')
        .insert([{
          club_id: clubId,
          user_id: userId,
          contribution_amount: contributionAmount,
          net_contribution: netContribution,
          token_balance: tokensReceived,
          wallet_address: walletAddress
        }])
        .select()
        .single()

      if (error) {
        console.error('Error joining club:', error)
        throw error
      }

      // Update club treasury
      await this.updateTreasuryBalance(clubId, (club.treasury_balance || 0) + netContribution)

      // Mint membership tokens (tracked in database for now)
      await ContractService.mintMembershipTokens(clubId, walletAddress, netContribution)

      return {
        member,
        transactionSignature,
        tokensReceived,
        ownershipPercentage
      }

    } catch (error) {
      console.error('Error joining club with Web3:', error)
      throw new Error('Failed to join club')
    }
  }

  // Legacy join club method (for backward compatibility)
  static async joinClubLegacy(clubId: string, userId: string, contributionAmount: number = 0): Promise<Member> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('members')
      .insert([{
        club_id: clubId,
        user_id: userId,
        contribution_amount: contributionAmount,
        token_balance: contributionAmount // For now, 1:1 ratio
      }])
      .select()
      .single()

    if (error) {
      console.error('Error joining club:', error)
      throw error
    }

    return data
  }

  // Get user's clubs
  static async getUserClubs(userId: string): Promise<ClubWithMembers[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty clubs array')
      return []
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select(`
        *,
        members!inner (
          *,
          user_profiles (*)
        )
      `)
      .eq('members.user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user clubs:', error)
      throw error
    }

    return data?.map((club: any) => ({
      ...club,
      member_count: club.members?.length || 0
    })) || []
  }

  // Update club treasury balance
  static async updateTreasuryBalance(clubId: string, newBalance: number): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('clubs')
      .update({ treasury_balance: newBalance })
      .eq('id', clubId)

    if (error) {
      console.error('Error updating treasury balance:', error)
      throw error
    }
  }

  // Sync treasury balance from blockchain
  static async syncTreasuryBalance(clubId: string): Promise<number> {
    try {
      const club = await this.getClubById(clubId)
      if (!club?.treasury_address) return 0

      // Get actual on-chain balance
      const onChainBalance = await ContractService.getTreasuryBalance(club.treasury_address)
      const balanceInUsdc = ContractService.smallestUnitToUsdc(onChainBalance)

      // Update database with actual balance
      await this.updateTreasuryBalance(clubId, balanceInUsdc)

      return balanceInUsdc
    } catch (error) {
      console.error('Error syncing treasury balance:', error)
      return 0
    }
  }

  // Calculate member ownership percentage
  static async calculateMemberOwnership(clubId: string, memberId: string): Promise<number> {
    try {
      const club = await this.getClubById(clubId)
      if (!club || !club.treasury_balance) return 0

      const supabase = getSupabaseClient()
      const { data: member, error } = await supabase
        .from('members')
        .select('token_balance')
        .eq('id', memberId)
        .single()

      if (error || !member) return 0

      return (member.token_balance / club.treasury_balance) * 100
    } catch (error) {
      console.error('Error calculating ownership:', error)
      return 0
    }
  }
}