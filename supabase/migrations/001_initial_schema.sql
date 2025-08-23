-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Early Access signups
CREATE TABLE IF NOT EXISTS early_access (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  utm_source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Twitter accounts
CREATE TABLE IF NOT EXISTS twitter_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  handle TEXT NOT NULL,
  twitter_user_id TEXT UNIQUE NOT NULL,
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  scopes TEXT[],
  status TEXT DEFAULT 'active',
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, twitter_user_id)
);

-- Influencer settings
CREATE TABLE IF NOT EXISTS influencer_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  content_types TEXT[] DEFAULT ARRAY['videos'],
  target_languages TEXT[] DEFAULT ARRAY['es', 'fr', 'de'],
  publish_behavior TEXT DEFAULT 'reply',
  reply_template TEXT,
  auto_publish BOOLEAN DEFAULT false,
  auto_dub_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Sources (original content to dub)
CREATE TABLE IF NOT EXISTS sources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  twitter_account_id UUID REFERENCES twitter_accounts(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('tweet', 'space', 'livestream')),
  source_url TEXT NOT NULL,
  media_url TEXT,
  media_s3_key TEXT,
  duration_seconds INTEGER,
  discovered_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  status TEXT DEFAULT 'discovered',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(source_id, source_type)
);

-- SpeechLab projects
CREATE TABLE IF NOT EXISTS speechlab_projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL,
  third_party_id TEXT UNIQUE NOT NULL,
  project_name TEXT,
  status TEXT DEFAULT 'processing',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Individual language dubs
CREATE TABLE IF NOT EXISTS dubs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  speechlab_project_id UUID REFERENCES speechlab_projects(id) ON DELETE SET NULL,
  language TEXT NOT NULL,
  output_url TEXT,
  output_s3_key TEXT,
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  published_tweet_id TEXT,
  published_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Usage tracking
CREATE TABLE IF NOT EXISTS usage_ledger (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT,
  minutes_used DECIMAL(10, 2) DEFAULT 0,
  languages_count INTEGER,
  source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
  dub_id UUID REFERENCES dubs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan_id TEXT,
  status TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  allow_overage BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- OAuth sessions (temporary storage for OAuth flow)
CREATE TABLE IF NOT EXISTS oauth_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  state TEXT UNIQUE NOT NULL,
  code_verifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW() + INTERVAL '10 minutes')
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  twitter_handle TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Webhooks log
CREATE TABLE IF NOT EXISTS webhooks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Audit log
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sources_user_id ON sources(user_id);
CREATE INDEX IF NOT EXISTS idx_sources_status ON sources(status);
CREATE INDEX IF NOT EXISTS idx_dubs_source_id ON dubs(source_id);
CREATE INDEX IF NOT EXISTS idx_dubs_status ON dubs(status);
CREATE INDEX IF NOT EXISTS idx_usage_ledger_user_id ON usage_ledger(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_ledger_created_at ON usage_ledger(created_at);
CREATE INDEX IF NOT EXISTS idx_twitter_accounts_user_id ON twitter_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_speechlab_projects_status ON speechlab_projects(status);

-- Row Level Security (RLS)
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE twitter_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE speechlab_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE dubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only see their own data)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own twitter accounts" ON twitter_accounts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own twitter accounts" ON twitter_accounts
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own settings" ON influencer_settings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage own settings" ON influencer_settings
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can view own sources" ON sources
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view own dubs" ON dubs
  FOR SELECT USING (
    source_id IN (SELECT id FROM sources WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view own usage" ON usage_ledger
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Public access for early access signups (no auth required)
CREATE POLICY "Anyone can sign up for early access" ON early_access
  FOR INSERT WITH CHECK (true);

-- Service role can do everything (for backend operations)
CREATE POLICY "Service role has full access" ON sources
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role has full access to projects" ON speechlab_projects
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role has full access to dubs" ON dubs
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');