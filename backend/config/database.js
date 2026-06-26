const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use DATABASE_URL for production (Vercel), fallback to individual variables
const sequelize = new Sequelize(
  process.env.DATABASE_URL || {
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
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced!');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
  }
};

module.exports = { sequelize, testConnection };