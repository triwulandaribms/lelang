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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "auctionBidding",
    timestamps: true,
  }
);


module.exports = { auctionBiddingModel };
