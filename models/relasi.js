const { sequelize } = require("../config/db.js");
const { auctionModel } = require("./auctionModel.js");
const { auctionBiddingModel } = require("./auctionBiddingModel.js");

auctionModel.hasMany(auctionBiddingModel, { foreignKey: 'auction_id' });
auctionBiddingModel.belongsTo(auctionModel, { foreignKey: 'auction_id' });


async function syncDatabase() {
    try {
      await sequelize.sync({ alter: true });
      console.log("sinkronisasi sukses");
    } catch (err) {
      console.error("sinkronisasi gagal:", err);
    }
  }

module.exports = {
    syncDatabase,
    auctionModel,
    auctionBiddingModel
  };