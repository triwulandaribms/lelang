require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'triwulandari3456',
    database: process.env.DB_NAME || 'lelang',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', 
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  },
  production: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'triwulandari3456',
    database: process.env.DB_NAME || 'lelang',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  },
};

