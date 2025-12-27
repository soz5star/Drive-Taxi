/*
  # Temporarily Disable RLS for Testing
  
  1. Changes
    - Disable RLS on bookings table temporarily
    - Will re-enable in next migration after confirming insert works
  
  2. Security
    - This is temporary for debugging
*/

-- Temporarily disable RLS
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
