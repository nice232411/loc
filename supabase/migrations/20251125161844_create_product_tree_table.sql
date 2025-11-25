/*
  # Create Product Tree Data Table

  ## Overview
  This migration creates a shared product tree data storage for real-time collaboration
  without authentication. All users can read and write to the same shared dataset.

  ## Tables Created
  1. `product_tree_data`
     - `id` (integer, primary key) - Always 1, single shared record
     - `data` (jsonb) - Complete product tree data structure
     - `updated_at` (timestamptz) - Last update timestamp
     - `version` (integer) - Optimistic locking version

  ## Security
  - RLS enabled with public read/write access
  - All users share the same data record
  - No authentication required

  ## Notes
  - Single record design (id=1) ensures all users see the same data
  - JSONB allows flexible schema updates without migrations
  - Version field helps with optimistic locking
*/

-- Create the product_tree_data table
CREATE TABLE IF NOT EXISTS product_tree_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  version INTEGER DEFAULT 0,
  CONSTRAINT single_row_only CHECK (id = 1)
);

-- Create index for faster JSONB queries
CREATE INDEX IF NOT EXISTS idx_product_tree_data_jsonb ON product_tree_data USING gin(data);

-- Insert initial empty record
INSERT INTO product_tree_data (id, data, version)
VALUES (1, '{}'::jsonb, 0)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE product_tree_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON product_tree_data
  FOR SELECT
  TO anon
  USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access"
  ON product_tree_data
  FOR INSERT
  TO anon
  WITH CHECK (id = 1);

-- Allow public update access
CREATE POLICY "Allow public update access"
  ON product_tree_data
  FOR UPDATE
  TO anon
  USING (id = 1)
  WITH CHECK (id = 1);

-- Function to automatically update updated_at and increment version
CREATE OR REPLACE FUNCTION update_product_tree_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.version = OLD.version + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
DROP TRIGGER IF EXISTS update_product_tree_timestamp_trigger ON product_tree_data;
CREATE TRIGGER update_product_tree_timestamp_trigger
  BEFORE UPDATE ON product_tree_data
  FOR EACH ROW
  EXECUTE FUNCTION update_product_tree_timestamp();
