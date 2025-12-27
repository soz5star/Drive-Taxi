/*
  # Fix Anonymous Insert Permissions for Bookings
  
  1. Changes
    - Grant INSERT permission to anon role on bookings table
    - Recreate RLS policy with proper syntax
  
  2. Security
    - Allow anonymous users to submit bookings through the public form
    - Only INSERT is allowed for anonymous users
*/

-- First, grant INSERT permission to anon role
GRANT INSERT ON bookings TO anon;

-- Drop and recreate the policy with correct syntax
DROP POLICY IF EXISTS "Anyone can submit a booking" ON bookings;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);
