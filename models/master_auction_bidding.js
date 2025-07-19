'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Master_auction_bidding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Master_auction_bidding.init({
    auction_id: DataTypes.INTEGER,
    harga_tawar: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Master_auction_bidding',
  });
  return Master_auction_bidding;
};