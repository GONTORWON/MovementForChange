# MCEFL Deployment Guide for Render

This guide explains how to deploy the MCEFL website to Render with an external PostgreSQL database.

## Prerequisites

1. A GitHub account with this repository pushed
2. A Render account (free tier works)
3. A PostgreSQL database (Neon, Supabase, or Render PostgreSQL)

---

## Step 1: Create an External PostgreSQL Database

### Option A: Neon (Recommended - Free Forever)
1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string (starts with `postgresql://...`)

### Option B: Render PostgreSQL
1. In Render dashboard, click "New" → "PostgreSQL"
2. Choose the free tier
3. Copy the "External Database URL"

---

## Step 2: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | mcefl-website |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build && npm run db:push` |
| **Start Command** | `npm run start` |

---

## Step 3: Set Environment Variables

In Render → Your Service → Environment, add these variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `SESSION_SECRET` | Any random string (e.g., `mcefl-secret-key-2025-xyz`) |
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `VITE_STRIPE_PUBLIC_KEY` | Your Stripe publishable key |
| `NODE_ENV` | `production` |

---

## Step 4: Deploy and Setup Database

1. Click "Manual Deploy" → "Deploy latest commit"
2. Wait for the build to complete
3. Open the Render Shell (click "Shell" in your service)
4. Run: `node scripts/setup-production-db.js`

This creates the admin accounts:
- **Super Admin:** `admin` / `Admin@2025`
- **Admin 1:** `admin1` / `Admin1@2025`
- **Admin 2:** `admin2` / `Admin2@2025`

---

## Step 5: Verify Deployment

1. Visit your Render URL (e.g., `https://mcefl-website.onrender.com`)
2. Go to `/admin/login` 
3. Login with `admin` / `Admin@2025`
4. **Change the password immediately!**

---

## Troubleshooting

### "ECONNREFUSED" Error
- Your DATABASE_URL is pointing to Replit's database
- Update DATABASE_URL to your Neon/Supabase/Render PostgreSQL URL

### "relation does not exist" Error
- Tables haven't been created yet
- Run `npm run db:push` in Render Shell

### Login Not Working
- Run `node scripts/setup-production-db.js` to create admin accounts

---

## Updating the Website

1. Make changes in Replit
2. Push to GitHub: `git push origin main`
3. Render will auto-deploy (or click "Manual Deploy")

---

## Admin Credentials Summary

| Username | Password | Role |
|----------|----------|------|
| admin | Admin@2025 | Super Admin |
| admin1 | Admin1@2025 | Admin |
| admin2 | Admin2@2025 | Admin |

⚠️ **Change all passwords after first login!**
