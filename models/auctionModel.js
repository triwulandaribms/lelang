const  { sequelize }  = require("../config/db.js");
const { DataTypes } = require("sequelize");

const auctionModel = sequelize.define(
  "Auction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    harga_awal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    waktu_mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    waktu_akhir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Waiting Approval",
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
    tableName: "Auction",
  }
);


module.exports = { auctionModel };
