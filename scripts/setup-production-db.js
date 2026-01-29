/**
 * MCEFL Production Database Setup Script
 * 
 * Run this script ONCE after deploying to Render with a new database.
 * 
 * Usage on Render Shell:
 *   node scripts/setup-production-db.js
 * 
 * Prerequisites:
 *   - DATABASE_URL environment variable must be set to your external database
 *   - Run 'npm run db:push' first to create the tables
 */

import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const SALT_ROUNDS = 10;

async function setupDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
    console.log('Please set DATABASE_URL to your PostgreSQL connection string.');
    process.exit(1);
  }

  console.log('🔌 Connecting to database...');
  
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected successfully!\n');

    console.log('👤 Creating admin accounts...');
    
    const adminAccounts = [
      { username: 'admin', password: 'Admin@2025', role: 'super_admin', fullName: 'Super Administrator', email: 'admin@mcefl.org' },
      { username: 'admin1', password: 'Admin1@2025', role: 'admin', fullName: 'Administrator One', email: 'admin1@mcefl.org' },
      { username: 'admin2', password: 'Admin2@2025', role: 'admin', fullName: 'Administrator Two', email: 'admin2@mcefl.org' },
    ];

    for (const account of adminAccounts) {
      const hashedPassword = await bcrypt.hash(account.password, SALT_ROUNDS);
      
      const query = `
        INSERT INTO users (id, username, password, role, full_name, email, is_active, created_at)
        VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, true, NOW())
        ON CONFLICT (username) DO NOTHING
      `;
      
      await pool.query(query, [
        account.username,
        hashedPassword,
        account.role,
        account.fullName,
        account.email
      ]);
      
      console.log(`   ✅ Created ${account.role}: ${account.username}`);
    }

    console.log('\n🎉 Database setup completed successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 ADMIN LOGIN CREDENTIALS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Super Admin:  admin    / Admin@2025');
    console.log('Admin 1:      admin1   / Admin1@2025');
    console.log('Admin 2:      admin2   / Admin2@2025');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change these passwords after first login!\n');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }

  process.exit(0);
}

setupDatabase();
