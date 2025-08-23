-- Create early_access table for email signups
CREATE TABLE IF NOT EXISTS early_access (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_medium VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_early_access_email ON early_access(email);
CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access(created_at DESC);

-- Enable Row Level Security
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from the anon role
CREATE POLICY "Allow public inserts" ON early_access
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Optional: Create a policy for admin reads
CREATE POLICY "Allow admin reads" ON early_access
    FOR SELECT
    TO authenticated
    USING (true);