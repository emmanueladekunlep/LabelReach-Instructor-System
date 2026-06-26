const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
    },
  }
);

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