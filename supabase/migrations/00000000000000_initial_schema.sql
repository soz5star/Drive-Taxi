-- Initial schema migration for Drive Taxi
-- This creates the base bookings table

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  pickup_location text NOT NULL,
  dropoff_location text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  flight_number text,
  passengers integer NOT NULL DEFAULT 1,
  luggage integer NOT NULL DEFAULT 0,
  is_student boolean NOT NULL DEFAULT false,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
-- Allow anonymous users to insert bookings (for public booking form)
CREATE POLICY "Allow anonymous inserts" ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all bookings
CREATE POLICY "Allow authenticated select" ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
