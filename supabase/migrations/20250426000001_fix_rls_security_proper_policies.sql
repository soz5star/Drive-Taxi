--
-- Fix RLS Security - Proper Policies for Bookings Table
-- 
-- This migration re-enables RLS with secure policies:
-- 1. Anonymous users can ONLY insert (for public booking form)
-- 2. Only authenticated users can select/update/delete
--

-- First, re-enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to start fresh
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_select_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_update_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_delete_bookings" ON bookings;
DROP POLICY IF EXISTS "public_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "allow_anon_insert" ON bookings;
DROP POLICY IF EXISTS "allow_auth_select" ON bookings;
DROP POLICY IF EXISTS "allow_auth_update" ON bookings;
DROP POLICY IF EXISTS "allow_auth_delete" ON bookings;

-- Policy 1: Allow anonymous inserts (for public booking form)
CREATE POLICY "allow_anon_insert_bookings"
ON bookings
FOR INSERT
TO anon
WITH CHECK (true);

-- Also allow authenticated users to insert (for potential admin-created bookings)
CREATE POLICY "allow_auth_insert_bookings"
ON bookings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 2: Only authenticated users can view bookings
CREATE POLICY "allow_auth_select_bookings"
ON bookings
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Only authenticated users can update bookings
CREATE POLICY "allow_auth_update_bookings"
ON bookings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Only authenticated users can delete bookings
CREATE POLICY "allow_auth_delete_bookings"
ON bookings
FOR DELETE
TO authenticated
USING (true);

-- Ensure authenticated users can still access all data
-- while anonymous users can only insert

COMMENT ON POLICY "allow_anon_insert_bookings" ON bookings IS 
  'Allows anonymous users to submit bookings via the public form';

COMMENT ON POLICY "allow_auth_select_bookings" ON bookings IS 
  'Only authenticated admin users can view booking data';
