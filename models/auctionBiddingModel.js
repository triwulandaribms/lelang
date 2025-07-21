const  { sequelize } = require("../config/db.js");
const { DataTypes } = require("sequelize");

const auctionBiddingModel = sequelize.define(
  "auctionBidding",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    auction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Auction",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    harga_tawar: {
      type: DataTypes.DECIMAL,
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
    tableName: "auctionBidding",
  }
);


module.exports = { auctionBiddingModel };
