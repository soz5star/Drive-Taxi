/*
  # Fix RLS for Public Booking Submissions
  
  1. Changes
    - Drop existing policies
    - Create policy that allows both anon and authenticated users to insert
    - Ensure policy applies to public role as well
  
  2. Security
    - Allow anonymous users to submit bookings through the public form
    - Allow authenticated admin users to also create bookings
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can submit a booking" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;

-- Create policy for INSERT that works for both anon and authenticated
CREATE POLICY "Allow public booking submissions"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for authenticated users to view all bookings
CREATE POLICY "Authenticated users can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update bookings
CREATE POLICY "Authenticated users can update bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to delete bookings
CREATE POLICY "Authenticated users can delete bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
