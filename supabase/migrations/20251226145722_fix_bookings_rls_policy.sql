/*
  # Fix Bookings RLS Policy
  
  1. Changes
    - Drop the existing restrictive INSERT policy
    - Create a proper INSERT policy that allows anonymous users to submit bookings
  
  2. Security
    - Allow anonymous users (anon role) to insert new bookings
    - This is necessary for the public booking form to work
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can submit a booking" ON bookings;

-- Create a proper INSERT policy for anonymous users
CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);
