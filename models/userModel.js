const  { sequelize }  = require("../config/db.js");
const { DataTypes } = require("sequelize");

const userModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
        type: DataTypes.ENUM("buyer", "seller"),
        allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_by: {
      type: DataTypes.STRING,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "User",
  }
);


module.exports = { userModel };
