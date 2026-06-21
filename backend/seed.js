const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

const seedUsers = [
  // Farmers (sellers)
  { fullName: 'Rajesh Patel', phone: '9876543210', email: 'rajesh@farm.com', password: 'password123', role: 'seller', village: 'Dhoraji', city: 'Rajkot', state: 'Gujarat', description: 'Organic farmer with 10 years of experience in vegetable farming.' },
  { fullName: 'Amit Sharma', phone: '9876543211', email: 'amit@farm.com', password: 'password123', role: 'seller', village: 'Anand', city: 'Anand', state: 'Gujarat', description: 'Dairy farmer supplying fresh milk and dairy products.' },
  { fullName: 'Priya Desai', phone: '9876543212', email: 'priya@farm.com', password: 'password123', role: 'seller', village: 'Navsari', city: 'Surat', state: 'Gujarat', description: 'Specializing in organic fruits and spices.' },
  { fullName: 'Vikas Singh', phone: '9876543213', email: 'vikas@farm.com', password: 'password123', role: 'seller', village: 'Mehsana', city: 'Mehsana', state: 'Gujarat', description: 'Grain farmer producing high-quality wheat and rice.' },
  { fullName: 'Sonal Mehta', phone: '9876543214', email: 'sonal@farm.com', password: 'password123', role: 'seller', village: 'Junagadh', city: 'Junagadh', state: 'Gujarat', description: 'Fruit orchard owner growing mangoes, bananas, and citrus fruits.' },

  // Buyers
  { fullName: 'Rohan Gupta', phone: '9988776655', email: 'rohan@buyer.com', password: 'password123', role: 'buyer', village: 'Navrangpura', city: 'Ahmedabad', state: 'Gujarat' },
  { fullName: 'Neha Kapoor', phone: '9988776656', email: 'neha@buyer.com', password: 'password123', role: 'buyer', village: 'Vadodara', city: 'Vadodara', state: 'Gujarat' },
  { fullName: 'Kunal Joshi', phone: '9988776657', email: 'kunal@buyer.com', password: 'password123', role: 'buyer', village: 'Surat', city: 'Surat', state: 'Gujarat' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    console.log('Cleared existing users');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const created = [];
    for (const u of seedUsers) {
      const user = await User.create({ ...u, password: hashedPassword });
      created.push(user);
    }

    console.log(`\nSeeded ${created.length} accounts successfully!\n`);

    console.log('--- Farmers (sellers) ---');
    created.filter(u => u.role === 'seller').forEach(u => {
      console.log(`  ${u.fullName}  |  ${u.email}  |  password123  |  ${u.village}, ${u.city}`);
    });

    console.log('\n--- Buyers ---');
    created.filter(u => u.role === 'buyer').forEach(u => {
      console.log(`  ${u.fullName}  |  ${u.email}  |  password123`);
    });

    console.log('\nAll passwords: password123');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
