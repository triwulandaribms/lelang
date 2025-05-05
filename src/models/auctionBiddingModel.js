import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const auctionBiddingModel = sequelize.define("Bidding", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    auctionId:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'Auction',
            key: 'id'
          }
    },
    harga_tawar: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},
{
    tableName:"Bidding",
    timestamps: false,
}
);

sequelize.sync();

