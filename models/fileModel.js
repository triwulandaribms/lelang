
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const fileModel = sequelize.define('File', {
  fileName: DataTypes.STRING,
  filePath: DataTypes.STRING,
  mimeType: DataTypes.STRING,
},
{
    tableName: "File",
});

module.exports = { fileModel };
