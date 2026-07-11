/*
  # Re-enable RLS on bookings with correct policies

  Context
    An earlier migration (20251226223352_disable_rls_for_public_booking_form)
    DISABLED row level security on `bookings`, leaving protection to table
    GRANTs alone. That rationale was mistaken: anonymous INSERT works perfectly
    well WITH RLS enabled (see 20251226223241), and bookings contain customer
    PII (names, phone numbers, emails, addresses, travel times) that should not
    be readable by the anon role. This migration restores the intended model.

  Final state
    - RLS ENABLED on bookings
    - anon: may INSERT only (public booking form) — cannot SELECT/UPDATE/DELETE
    - authenticated: full access (admin dashboard)

  This migration is idempotent and safe to re-run.
*/

-- Ensure grants match the policy intent
GRANT INSERT ON bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON bookings TO authenticated;

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Recreate policies cleanly (drop any prior variants first)
DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "public_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_select_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_update_bookings" ON bookings;
DROP POLICY IF EXISTS "authenticated_delete_bookings" ON bookings;

-- Anonymous visitors can submit bookings (INSERT only)
CREATE POLICY "anon_insert_bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated admins can read all bookings
CREATE POLICY "authenticated_select_bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can update bookings
CREATE POLICY "authenticated_update_bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated admins can delete bookings
CREATE POLICY "authenticated_delete_bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
