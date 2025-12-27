/*
  # Add Admin Dashboard Features

  1. Booking Enhancements
    - Add `status` column to bookings (pending, confirmed, in_progress, completed, cancelled)
    - Add `price` column for revenue tracking
    - Add `driver_id` for driver assignment
    - Add `vehicle_id` for vehicle assignment
    - Add `estimated_duration` for route planning
    
  2. New Tables
    - `drivers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `license_number` (text)
      - `status` (text: available, on_trip, offline)
      - `created_at` (timestamp)
      
    - `vehicles`
      - `id` (uuid, primary key)
      - `make` (text)
      - `model` (text)
      - `year` (integer)
      - `plate_number` (text, unique)
      - `capacity` (integer)
      - `status` (text: available, in_use, maintenance)
      - `created_at` (timestamp)
      
  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated admin users
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'status'
  ) THEN
    ALTER TABLE bookings ADD COLUMN status text DEFAULT 'pending';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'price'
  ) THEN
    ALTER TABLE bookings ADD COLUMN price decimal(10,2);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'driver_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN driver_id uuid;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'vehicle_id'
  ) THEN
    ALTER TABLE bookings ADD COLUMN vehicle_id uuid;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'estimated_duration'
  ) THEN
    ALTER TABLE bookings ADD COLUMN estimated_duration integer;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  license_number text NOT NULL,
  status text DEFAULT 'available' CHECK (status IN ('available', 'on_trip', 'offline')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view drivers"
  ON drivers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert drivers"
  ON drivers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update drivers"
  ON drivers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete drivers"
  ON drivers FOR DELETE
  TO authenticated
  USING (true);

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

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view vehicles"
  ON vehicles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

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