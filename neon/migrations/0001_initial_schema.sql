-- Drive Taxi schema for Neon Postgres (Data API).
--
-- Consolidates the previous Supabase migration history into the final state.
-- Role names follow the Neon Data API: `anonymous` (unauthenticated requests)
-- and `authenticated` (requests carrying a valid Neon Auth JWT).
--
-- Access model:
--   anonymous     INSERT on bookings only (public booking form)
--   authenticated full access to every table (admin dashboard)
--
-- Idempotent: safe to re-run against an existing branch.

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  pickup_location text NOT NULL,
  dropoff_location text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time time NOT NULL,
  flight_number text,
  passengers integer NOT NULL DEFAULT 1,
  luggage integer NOT NULL DEFAULT 0,
  is_student boolean NOT NULL DEFAULT false,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  price decimal(10, 2),
  driver_id uuid,
  vehicle_id uuid,
  estimated_duration integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  license_number text NOT NULL,
  status text DEFAULT 'available' CHECK (status IN ('available', 'on_trip', 'offline')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  plate_number text UNIQUE NOT NULL,
  capacity integer NOT NULL DEFAULT 4,
  status text DEFAULT 'available' CHECK (status IN ('available', 'in_use', 'maintenance')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  category text NOT NULL CHECK (category IN ('fuel', 'maintenance', 'insurance', 'tax', 'other')),
  description text NOT NULL,
  amount decimal(10, 2) NOT NULL CHECK (amount >= 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value boolean NOT NULL,
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'bookings_driver_id_fkey'
  ) THEN
    ALTER TABLE bookings
      ADD CONSTRAINT bookings_driver_id_fkey
      FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'bookings_vehicle_id_fkey'
  ) THEN
    ALTER TABLE bookings
      ADD CONSTRAINT bookings_vehicle_id_fkey
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_bookings_driver_id ON bookings(driver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

INSERT INTO settings (key, value)
VALUES ('send_owner_notifications', true)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anonymous, authenticated;
GRANT INSERT ON bookings TO anonymous;
GRANT SELECT, INSERT, UPDATE, DELETE ON bookings, drivers, vehicles, expenses, settings TO authenticated;

DROP POLICY IF EXISTS anonymous_insert_bookings ON bookings;
CREATE POLICY anonymous_insert_bookings ON bookings
  FOR INSERT TO anonymous WITH CHECK (true);

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['bookings', 'drivers', 'vehicles', 'expenses', 'settings'] LOOP
    EXECUTE format('DROP POLICY IF EXISTS authenticated_all_%1$s ON %1$I', t);
    EXECUTE format(
      'CREATE POLICY authenticated_all_%1$s ON %1$I FOR ALL TO authenticated USING (true) WITH CHECK (true)',
      t
    );
  END LOOP;
END $$;
