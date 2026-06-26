const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('🔍 Checking database environment variables:');
console.log('DB_HOST:', process.env.DB_HOST ? '✅ Set' : '❌ Missing');
console.log('DB_NAME:', process.env.DB_NAME ? '✅ Set' : '❌ Missing');
console.log('DB_USER:', process.env.DB_USER ? '✅ Set' : '❌ Missing');
console.log('DB_PORT:', process.env.DB_PORT ? '✅ Set' : '❌ Missing');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');

// Use DATABASE_URL if available, otherwise use individual variables
let sequelize;

if (process.env.DATABASE_URL) {
  console.log('📌 Using DATABASE_URL for connection');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  console.log('📌 Using individual variables for connection');
  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced!');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
  }
};

module.exports = { sequelize, testConnection };