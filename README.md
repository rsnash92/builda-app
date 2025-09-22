# builda-app

The authenticated app subdomain for builda.club - `app.builda.club`

## Overview

This is the separate Next.js project that powers the authenticated app experience at `app.builda.club`. It contains:

- **Club Management Interface** - Full Discord-like club management with tabs
- **Authentication** - Privy + Supabase integration
- **Treasury Dashboard** - Club treasury management and analytics
- **Chat System** - Real-time club communication
- **Resources & Vault** - Shared tools and club-created assets
- **Member Dashboard** - Personal stats and achievements

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Privy** - Web2 + Web3 authentication
- **Supabase** - Database and real-time features
- **Vercel** - Deployment

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Fill in your environment variables
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Deployment

This project is designed to be deployed as `app.builda.club` on Vercel.

### Vercel Setup

1. **Create new Vercel project** called `builda-app`
2. **Connect to this repository**
3. **Add custom domain** `app.builda.club`
4. **Set environment variables** in Vercel dashboard
5. **Deploy**

### DNS Configuration

Add a CNAME record:
```
app.builda.club → your-vercel-deployment.vercel.app
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── club/              # Club management pages
│   │   ├── [id]/          # Individual club pages
│   │   └── demo/          # Demo club page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   └── providers.tsx      # Auth providers
├── components/            # Reusable components
│   └── ui/               # UI components
├── contexts/             # React contexts
├── lib/                  # Utilities and services
└── globals.css           # Global styles
```

## Latest Updates (September 2025)

✅ **Discord-Style Chat System** - Complete real-time messaging with channels, threading, and replies
✅ **Privy Authentication** - Seamless Web2/Web3 login integration
✅ **Mock Data Infrastructure** - Comprehensive test data for development
✅ **Token-Gated Access** - Channel permissions based on club membership

## Features

### 🏠 **Main Dashboard**
- User welcome and stats
- Club overview and quick actions
- Recent activity feed

### 🏢 **Club Management**
- **Overview** - Club info, treasury chart, building progress
- **Chat** - Discord-like communication
- **Treasury** - Financial management and analytics
- **Resources** - Shared tools and vault
- **Members** - Member directory and management
- **Settings** - Club configuration (admin only)

### 🔐 **Authentication**
- **Privy Integration** - Web2 + Web3 auth
- **Supabase Sync** - User profile management
- **Protected Routes** - Automatic redirect for unauthenticated users

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy application ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Thirdweb client ID |

## Development

### Adding New Features

1. **Club Features** - Add to `src/app/club/[id]/components/`
2. **Dashboard Features** - Add to `src/app/page.tsx`
3. **Shared Components** - Add to `src/components/`

### Authentication Flow

1. User visits `app.builda.club`
2. Privy checks authentication status
3. If not authenticated → redirect to main site
4. If authenticated → show app dashboard
5. Supabase syncs user profile data

## Related Projects

- **builda-club** - Main marketing site (`builda.club`)
- **builda-app** - This authenticated app (`app.builda.club`)

## License

MIT License - see LICENSE file for details