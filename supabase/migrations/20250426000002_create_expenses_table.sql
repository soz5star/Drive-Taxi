-- Create expenses table for persistent expense tracking
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fuel', 'maintenance', 'insurance', 'tax', 'other')),
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on expenses table
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view expenses
CREATE POLICY "authenticated_select_expenses"
ON expenses
FOR SELECT
TO authenticated
USING (true);

-- Policy: Only authenticated users can insert expenses
CREATE POLICY "authenticated_insert_expenses"
ON expenses
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can update expenses
CREATE POLICY "authenticated_update_expenses"
ON expenses
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete expenses
CREATE POLICY "authenticated_delete_expenses"
ON expenses
FOR DELETE
TO authenticated
USING (true);

-- Create index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
