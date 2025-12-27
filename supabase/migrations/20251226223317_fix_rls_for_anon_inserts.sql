/*
  # Fix RLS for Anonymous Inserts
  
  1. Changes
    - Temporarily disable RLS
    - Drop existing policies
    - Re-enable RLS
    - Create new policies using 'public' role instead of 'anon'
  
  2. Security
    - Allow public (anon) users to INSERT bookings
    - Authenticated users can view, update, delete
*/

-- Disable RLS temporarily
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_select_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_update_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_delete_bookings" ON bookings;

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert (includes anon and authenticated)
CREATE POLICY "public_insert_bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for authenticated users to select
CREATE POLICY "authenticated_select_bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "authenticated_update_bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to delete
CREATE POLICY "authenticated_delete_bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
