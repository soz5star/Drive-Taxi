/*
  # Re-enable RLS with Proper Policies
  
  1. Changes
    - Re-enable RLS on bookings table
    - Create comprehensive policies for all operations
    - Allow anonymous users to insert bookings
    - Allow authenticated users full access
  
  2. Security
    - Public can submit bookings (INSERT only)
    - Authenticated admin users can view, update, and delete all bookings
*/

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow public booking submissions" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON bookings;

-- Policy for anonymous users to insert bookings
CREATE POLICY "enable_insert_for_anon"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy for authenticated users to select all bookings
CREATE POLICY "enable_select_for_authenticated"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update bookings
CREATE POLICY "enable_update_for_authenticated"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete bookings
CREATE POLICY "enable_delete_for_authenticated"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
