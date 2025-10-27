-- SafeTap Sphere Complete Database Setup
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  full_name TEXT,
  trusted_contact TEXT
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  description TEXT,
  anonymous BOOLEAN DEFAULT true,
  latitude FLOAT,
  longitude FLOAT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Alerts table
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  message TEXT,
  lat FLOAT,
  lon FLOAT,
  status TEXT DEFAULT 'pending',
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view reports" ON reports FOR SELECT USING (true);
CREATE POLICY "Users can create reports" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own alerts" ON alerts FOR ALL USING (auth.uid() = user_id);

-- Insert test user
INSERT INTO users (id, full_name, trusted_contact) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Test User',
  '+27123456789'
);