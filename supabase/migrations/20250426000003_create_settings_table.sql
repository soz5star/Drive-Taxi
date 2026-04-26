-- Create settings table for admin configuration
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value BOOLEAN NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on settings table
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view settings
CREATE POLICY "authenticated_select_settings"
ON settings
FOR SELECT
TO authenticated
USING (true);

-- Policy: Only authenticated users can insert settings
CREATE POLICY "authenticated_insert_settings"
ON settings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can update settings
CREATE POLICY "authenticated_update_settings"
ON settings
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete settings
CREATE POLICY "authenticated_delete_settings"
ON settings
FOR DELETE
TO authenticated
USING (true);

-- Insert default value for owner notifications (enabled by default)
INSERT INTO settings (key, value) 
VALUES ('send_owner_notifications', true)
ON CONFLICT (key) DO NOTHING;
