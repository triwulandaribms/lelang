const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Terhubung ke basis data.');
  } catch (error) {
    console.error('Gagal terhubung ke basis data:', error.message);
  }
}

testConnection();

module.exports = { sequelize };


// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const environment = process.env.NODE_ENV || 'development';

// const config = {
//   development: {
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || 'triwulandari3456',
//     database: process.env.DB_NAME || 'lelang',
//     host: process.env.DB_HOST || '127.0.0.1',
//     dialect: 'postgres',
//     port: process.env.DB_PORT || 5432,
//   },
//   production: {
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || 'triwulandari3456',
//     database: process.env.DB_NAME || 'lelang',
//     host: process.env.DB_HOST || '127.0.0.1',
//     dialect: 'postgres',
//     port: process.env.DB_PORT || 5432,
//   },
// };

// const sequelizeConfig = config[environment];

// const sequelizeInstance = new Sequelize(
//   sequelizeConfig.database,
//   sequelizeConfig.username,
//   sequelizeConfig.password,
//   {
//     host: sequelizeConfig.host,
//     dialect: sequelizeConfig.dialect,
//     port: sequelizeConfig.port,
//     logging: false,
//   }
// );

// module.exports = sequelizeInstance;
