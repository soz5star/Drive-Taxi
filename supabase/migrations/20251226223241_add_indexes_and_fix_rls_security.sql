/*
  # Add Indexes and Fix RLS Security
  
  1. Performance Improvements
    - Add index on bookings.driver_id foreign key
    - Add index on bookings.vehicle_id foreign key
    - Add index on bookings.status for filtering
    - Add index on bookings.pickup_date for date queries
  
  2. Security
    - Re-enable RLS on bookings table
    - Create policies that allow:
      * Anonymous users to INSERT bookings (public form)
      * Authenticated users to SELECT, UPDATE, DELETE (admin dashboard)
    - Use proper GRANT statements to ensure permissions
  
  Note: Auth DB Connection Strategy and Leaked Password Protection
  must be configured in the Supabase Dashboard under Settings.
*/

-- Add indexes for foreign keys to improve query performance
CREATE INDEX IF NOT EXISTS idx_bookings_driver_id ON bookings(driver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);

-- Add additional useful indexes
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Ensure proper grants for anon and authenticated roles
GRANT INSERT ON bookings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON bookings TO authenticated;

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert bookings (public booking form)
CREATE POLICY "anon_insert_bookings"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to select all bookings
CREATE POLICY "authenticated_select_bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update bookings
CREATE POLICY "authenticated_update_bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to delete bookings
CREATE POLICY "authenticated_delete_bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (true);
