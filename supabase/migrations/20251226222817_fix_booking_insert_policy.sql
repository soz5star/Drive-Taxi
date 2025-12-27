/*
  # Fix Booking Insert Policy
  
  1. Changes
    - Drop and recreate the anon INSERT policy for bookings
    - Ensure WITH CHECK clause allows all inserts
  
  2. Security
    - Allow anonymous users to submit bookings via the public form
    - No restrictions on insert data
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can submit a booking" ON bookings;

-- Recreate with explicit permissions
CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);
