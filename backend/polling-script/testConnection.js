import sql from '../db.js';

async function testConnection() {
  try {
    const result = await sql`SELECT 1 + 1 AS result`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}

testConnection();
