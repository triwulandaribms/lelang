const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  database: 'postgres', 
  logging: false,
});

const dbName = process.env.DB_NAME;

async function createDatabase() {
  try {
    const [results] = await sequelize.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (results.length > 0) {
      console.log(`Database '${dbName}' already exists.`);
    } else {
      await sequelize.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database '${dbName}' created successfully.`);
    }
  } catch (err) {
    console.error('Failed to create database:', err.message);
  } finally {
    await sequelize.close();
  }
}

module.exports = { createDatabase };
