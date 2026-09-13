# Database Setup Guide

## Overview
This project uses [Neon](https://neon.tech) (serverless PostgreSQL) for the database,
Neon Auth for admin sign-in, and the Neon Data API (PostgREST) for browser queries.

Tables:
- **bookings** - Customer booking requests
- **drivers** - Driver management
- **vehicles** - Vehicle fleet management
- **expenses** - Expense tracking
- **settings** - Key/value app settings

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values from the Neon Console
(Project → Data API / Auth) or by running `neon deploy` with the Neon CLI:

```bash
VITE_NEON_AUTH_URL=...        # Neon Auth URL
VITE_NEON_DATA_API_URL=...    # Data API (PostgREST) URL
DATABASE_URL=...              # Pooled connection string (migrations, API functions)
DATABASE_URL_UNPOOLED=...     # Direct connection string
NEON_AUTH_JWKS_URL=...        # Used by /api/send-sms-manual to verify admin tokens
```

Only `VITE_`-prefixed variables reach the browser. Everything else must stay
server-side (Vercel project environment variables).

## Applying the schema

Migrations live in `neon/migrations/` and are applied in filename order:

```bash
npm run db:migrate
```

The script reads `DATABASE_URL_UNPOOLED` (falling back to `DATABASE_URL`), so
load your environment first, e.g. `set -a && source .env.local && set +a`.

To apply the schema to a different Neon branch, point `DATABASE_URL` at that
branch's connection string.

## Admin access

Neon Auth manages admin accounts. Supabase password hashes cannot be imported,
so create the admin user in the Neon Console (Auth → Users) and sign in at
`/admin/login`.

## Per-PR database branches

`.github/workflows/neon_workflow.yml` creates a Neon branch for every pull
request (expiring after 14 days), runs `npm run db:migrate` against it, and
deletes it when the PR closes. It requires:

- repository variable `NEON_PROJECT_ID`
- repository secret `NEON_API_KEY`

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
| price | numeric | Quoted price |
| driver_id | uuid | Assigned driver |
| vehicle_id | uuid | Assigned vehicle |
| estimated_duration | integer | Minutes |
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

RLS is enabled on every application table and the Data API roles are granted
only what they need:

- **anonymous** (public booking form) — INSERT on `bookings` only, no read access
  to customer data.
- **authenticated** (admin dashboard) — full read/write on all tables.

If you add a table, enable RLS on it and add explicit grants/policies; without
them the Data API exposes nothing, which is the safe default.

## Troubleshooting

### Migration errors
Migrations are written to be re-runnable (`IF NOT EXISTS`, `DROP POLICY IF EXISTS`),
so re-applying them on an existing branch is safe.

### Connection issues
- Confirm `.env.local` has current values (`neon deploy` refreshes them).
- Check the Neon branch is not suspended or expired (preview branches expire after 14 days).

### CORS
The API functions under `api/` allow only the origins listed in
`api/_shared/cors.ts`; add new production or preview domains there.
