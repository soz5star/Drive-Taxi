# Database Setup Guide

## Overview
This project uses Supabase (PostgreSQL) for the database. The schema includes:
- **bookings** - Customer booking requests
- **drivers** - Driver management
- **vehicles** - Vehicle fleet management

## Environment Variables

Copy `.env.example` to `.env` and fill in your actual Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Option 1: Using Supabase Dashboard (Recommended)

Since Supabase CLI is not available in this environment, use the Supabase Dashboard:

### Step 1: Create Project
1. Go to https://supabase.com
2. Sign up/login and create a new project
3. Wait for the database to be provisioned

### Step 2: Run Migration Files
1. Go to your project's **SQL Editor**
2. Create a **New Query**
3. Copy and paste the contents of each migration file from `supabase/migrations/` in order:
   - `00000000000000_initial_schema.sql` (base schema)
   - `20251226144620_add_admin_features.sql` (admin features)
   - `20251226145722_fix_bookings_rls_policy.sql`
   - ... (remaining migration files in order)

### Step 3: Enable Auth (Optional - for admin dashboard)
1. Go to **Authentication** → **Settings**
2. Enable Email provider if you want admin login
3. Create a user for admin access

### Step 4: Update Environment Variables
1. Go to **Project Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Update your `.env` file

## Option 2: Using Supabase CLI (If Available)

If you have Docker and want to run Supabase locally:

```bash
# Install Supabase CLI (requires scoop on Windows, brew on macOS, or apt on Linux)
scoop install supabase

# Start local Supabase
supabase start

# Run migrations
supabase db reset
```

## Option 3: Direct SQL Execution

You can also run the SQL directly on any PostgreSQL instance:

```bash
# Connect to your PostgreSQL database
psql -h your-host -U your-user -d your-database -f supabase/migrations/00000000000000_initial_schema.sql
psql -h your-host -U your-user -d your-database -f supabase/migrations/20251226144620_add_admin_features.sql
# ... run remaining migrations in order
```

## Database Schema Summary

### bookings
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Customer name |
| phone | text | Customer phone |
| email | text | Customer email |
| pickup_location | text | Pickup address |
| dropoff_location | text | Dropoff address |
| pickup_date | date | Date of pickup |
| pickup_time | time | Time of pickup |
| flight_number | text | Optional flight number |
| passengers | integer | Number of passengers |
| luggage | integer | Number of luggage items |
| is_student | boolean | Student discount flag |
| notes | text | Additional notes |
| status | text | pending/confirmed/etc |
| created_at | timestamptz | Timestamp |

### drivers
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Driver name |
| phone | text | Driver phone |
| email | text | Driver email |
| license_number | text | License number |
| status | text | available/on_trip/offline |
| created_at | timestamptz | Timestamp |

### vehicles
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| make | text | Vehicle make |
| model | text | Vehicle model |
| year | integer | Vehicle year |
| plate_number | text | License plate |
| capacity | integer | Passenger capacity |
| status | text | available/in_use/maintenance |
| created_at | timestamptz | Timestamp |

## Row Level Security (RLS)

The database uses RLS policies:
- **Anonymous users** can insert bookings (public booking form)
- **Authenticated users** can view/manage all tables (admin dashboard)

## Troubleshooting

### Migration Errors
If you get errors about columns already existing, that's expected - the migration files use `IF NOT EXISTS` checks for safety.

### Connection Issues
- Verify your `.env` file has correct credentials
- Check if your Supabase project is active (not paused)
- Ensure you're using the **anon** key, not the service_role key

### CORS Issues
If testing locally, ensure your Supabase project allows requests from `http://localhost:5173` in **Authentication** → **URL Configuration**.
