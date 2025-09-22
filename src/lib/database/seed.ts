import { supabaseAdmin } from '@/lib/supabase'

// Test user profiles
const sampleUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    display_name: 'alice',
    avatar_url: null,
    bio: 'Full-stack developer and blockchain enthusiast',
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    display_name: 'bob',
    avatar_url: null,
    bio: 'Smart contract security researcher',
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    display_name: 'carol',
    avatar_url: null,
    bio: 'UI/UX designer focused on Web3',
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    display_name: 'david',
    avatar_url: null,
    bio: 'DeFi protocol architect',
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    display_name: 'eve',
    avatar_url: null,
    bio: 'Community manager and growth hacker',
    created_at: new Date().toISOString()
  }
]

const sampleClubs = [
  {
    name: "BUIDLers United",
    description: "A community of builders creating the future of Web3. Join us as we build innovative dApps and grow our treasury together.",
    category: "Developer",
    token_symbol: "$BUIDL",
    thumbnail_url: null,
    likes: 247,
    is_hot: true,
    is_lord_of_dev: false,
    progress: 75,
    market_cap: 148900,
    market_cap_change: 12.5,
    volume: 25000,
    treasury_balance: 148900,
    created_by: null // Will be set to owner after creation
  },
  {
    name: "PaceTerminal",
    description: "Blink and you'll miss how fast your tokens load in this lightning-fast terminal interface. Built for speed and efficiency.",
    category: "utility",
    token_symbol: "$PACE",
    thumbnail_url: null,
    likes: 14,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 92,
    market_cap: 148900,
    market_cap_change: -10.86,
    volume: 6700,
    treasury_balance: 148900,
    created_by: null
  },
  {
    name: "zalascape95",
    description: "Your project landing page disguised as a delightfully retro Windows 95 desktop. Nostalgia meets modern functionality.",
    category: "utility",
    token_symbol: "$ZALA",
    thumbnail_url: null,
    likes: 8,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 78,
    market_cap: 119500,
    market_cap_change: 20.39,
    volume: 5300,
    treasury_balance: 119500,
    created_by: null
  },
  {
    name: "zero.fun",
    description: "Stop the power surge at perfect zero to win SOL in this pixel-perfect timing game. Test your reflexes and win crypto.",
    category: "gaming",
    token_symbol: "$ZERO",
    thumbnail_url: null,
    likes: 23,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 45,
    market_cap: 4800,
    market_cap_change: 0.00,
    volume: 24.8,
    treasury_balance: 4800,
    created_by: null
  },
  {
    name: "Meme Generator",
    description: "Unleash your inner comedy genius with this ridiculously powerful meme creation tool. Create viral content in seconds.",
    category: "fun",
    token_symbol: "$MEME",
    thumbnail_url: null,
    likes: 156,
    is_hot: true,
    is_lord_of_dev: false,
    progress: 100,
    market_cap: 1200000,
    market_cap_change: -18.37,
    volume: 162700,
    treasury_balance: 1200000,
    created_by: null
  },
  {
    name: "YESNODAO",
    description: "Stake tiny SOL bets on daily predictions in a pixel-perfect prediction market. Will Oscar Piastri win F1 2023?",
    category: "gaming",
    token_symbol: "$YESNO",
    thumbnail_url: null,
    likes: 42,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 67,
    market_cap: 116300,
    market_cap_change: 1.87,
    volume: 2500,
    treasury_balance: 116300,
    created_by: null
  }
]

// Sample messages for testing
const sampleMessages = [
  {
    content: "Welcome to BUIDLers United! 🚀 Let's build the future together!",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440001' // alice
  },
  {
    content: "Hey everyone! Just pushed a new smart contract to testnet. Anyone want to help with testing?",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440002' // bob
  },
  {
    content: "Working on the new UI mockups for our treasury dashboard. Will share designs soon! 🎨",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440003' // carol
  },
  {
    content: "Found a potential optimization in our liquidity pool contract. Reviewing the math now 📊",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440004' // david
  },
  {
    content: "Great to see so much activity! Our community is really growing 💪",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440005' // eve
  },
  {
    content: "@bob I'd love to help test! What specific scenarios should we focus on?",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440001' // alice
  },
  {
    content: "The treasury is looking healthy! 💰 Current balance: 148,900 USDC",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440004' // david
  },
  {
    content: "Ship it! 🚢 Just deployed the latest version to mainnet",
    message_type: 'text',
    user_id: '550e8400-e29b-41d4-a716-446655440002' // bob
  }
]

export async function seedDatabase() {
  if (!supabaseAdmin) {
    console.error('Supabase admin client not configured')
    return
  }

  try {
    console.log('Starting database seed...')

    // Clear existing data in correct order (respecting foreign key constraints)
    await supabaseAdmin.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('channel_permissions').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('channels').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('members').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('clubs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabaseAdmin.from('user_profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // 1. Insert sample users
    console.log('Seeding users...')
    const { data: users, error: usersError } = await supabaseAdmin
      .from('user_profiles')
      .insert(sampleUsers)
      .select()

    if (usersError) {
      console.error('Error seeding users:', usersError)
      return
    }
    console.log(`✓ Seeded ${users.length} users`)

    // 2. Insert sample clubs
    console.log('Seeding clubs...')
    const { data: clubs, error: clubsError } = await supabaseAdmin
      .from('clubs')
      .insert(sampleClubs)
      .select()

    if (clubsError) {
      console.error('Error seeding clubs:', clubsError)
      return
    }
    console.log(`✓ Seeded ${clubs.length} clubs`)

    // 3. Create members for the first club (BUIDLers United will be created)
    const firstClub = clubs[0]
    if (firstClub) {
      console.log('Seeding members...')
      const memberData = sampleUsers.map((user, index) => ({
        club_id: firstClub.id,
        user_id: user.id,
        role: index === 0 ? 'owner' : 'member',
        token_balance: Math.floor(Math.random() * 1000) + 100,
        joined_at: new Date().toISOString()
      }))

      const { error: membersError } = await supabaseAdmin
        .from('members')
        .insert(memberData)

      if (membersError) {
        console.error('Error seeding members:', membersError)
        return
      }
      console.log(`✓ Seeded ${memberData.length} members`)

      // 4. Create channels for the first club
      console.log('Seeding channels...')
      const channelData = [
        {
          club_id: firstClub.id,
          name: 'general',
          description: 'General discussion for club members',
          type: 'text',
          position: 0,
          created_by: sampleUsers[0].id
        },
        {
          club_id: firstClub.id,
          name: 'announcements',
          description: 'Important club announcements',
          type: 'announcement',
          position: 1,
          created_by: sampleUsers[0].id
        },
        {
          club_id: firstClub.id,
          name: 'treasury',
          description: 'Treasury updates and financial discussions',
          type: 'treasury',
          position: 2,
          created_by: sampleUsers[0].id
        },
        {
          club_id: firstClub.id,
          name: 'building',
          description: 'Development updates and tech discussions',
          type: 'text',
          position: 3,
          created_by: sampleUsers[0].id
        }
      ]

      const { data: channels, error: channelsError } = await supabaseAdmin
        .from('channels')
        .insert(channelData)
        .select()

      if (channelsError) {
        console.error('Error seeding channels:', channelsError)
        return
      }
      console.log(`✓ Seeded ${channels.length} channels`)

      // 5. Add messages to the general channel
      const generalChannel = channels.find(c => c.name === 'general')
      if (generalChannel) {
        console.log('Seeding messages...')
        const messagesWithChannelId = sampleMessages.map((msg, index) => ({
          ...msg,
          channel_id: generalChannel.id,
          created_at: new Date(Date.now() - (sampleMessages.length - index) * 60000).toISOString() // Space messages 1 minute apart
        }))

        const { error: messagesError } = await supabaseAdmin
          .from('messages')
          .insert(messagesWithChannelId)

        if (messagesError) {
          console.error('Error seeding messages:', messagesError)
          return
        }
        console.log(`✓ Seeded ${messagesWithChannelId.length} messages`)
      }

      // 6. Set up channel permissions
      console.log('Setting up channel permissions...')
      const permissionsData = channels.flatMap(channel => [
        {
          channel_id: channel.id,
          role: 'member',
          min_tokens: 0,
          can_read: true,
          can_write: true,
          can_manage: false
        },
        {
          channel_id: channel.id,
          role: 'owner',
          min_tokens: 0,
          can_read: true,
          can_write: true,
          can_manage: true
        }
      ])

      const { error: permissionsError } = await supabaseAdmin
        .from('channel_permissions')
        .insert(permissionsData)

      if (permissionsError) {
        console.error('Error seeding permissions:', permissionsError)
        return
      }
      console.log(`✓ Seeded ${permissionsData.length} channel permissions`)
    }

    console.log('🎉 Database seeding completed successfully!')
    return { clubs, users }
  } catch (error) {
    console.error('Error during seeding:', error)
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().then(() => {
    console.log('Seeding complete')
    process.exit(0)
  }).catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
}
