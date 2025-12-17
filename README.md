# supabase-chat-app

Simple chat application built with Next.js and Supabase for learning purposes.

## Local Development Setup

### Prerequisites
- Node.js 18+
- pnpm
- Docker (for local Supabase)

### Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd supabase-chat-app
   pnpm install
   ```

2. **Start local Supabase:**
   ```bash
   pnpm supabase:start
   # or
   npx supabase start
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Access applications:**
   - Next.js App: http://localhost:3000
   - Supabase Studio: http://localhost:54323
   - Mailpit (Email testing): http://localhost:54324

### Authentication Setup

To enable Google OAuth authentication:

1. Open Supabase Studio at http://localhost:54323
2. Navigate to **Authentication > Providers**
3. Enable Google provider and configure with your OAuth credentials

### Environment Variables

The project uses `.env.local` for local development (automatically configured by setup):
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase publishable key  
- `SUPABASE_SERVICE_ROLE_KEY`: Server-side service role key
