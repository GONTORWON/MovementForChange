import { db } from '../server/db';
import { users } from '../shared/schema';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  try {
    // Create admin accounts
    const adminAccounts = [
      { username: 'admin', password: 'Admin@2025', role: 'super_admin', fullName: 'Super Administrator', email: 'admin@mcefl.org' },
      { username: 'admin1', password: 'Admin1@2025', role: 'admin', fullName: 'Administrator One', email: 'admin1@mcefl.org' },
      { username: 'admin2', password: 'Admin2@2025', role: 'admin', fullName: 'Administrator Two', email: 'admin2@mcefl.org' },
    ];

    for (const account of adminAccounts) {
      const hashedPassword = await bcrypt.hash(account.password, SALT_ROUNDS);
      
      await db.insert(users).values({
        username: account.username,
        password: hashedPassword,
        role: account.role,
        fullName: account.fullName,
        email: account.email,
        isActive: true,
      }).onConflictDoNothing();
      
      console.log(`✅ Created ${account.role}: ${account.username}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('   Super Admin: admin / Admin@2025');
    console.log('   Admin 1: admin1 / Admin1@2025');
    console.log('   Admin 2: admin2 / Admin2@2025');
    console.log('\n⚠️  Please change these passwords after first login!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

seedDatabase();
