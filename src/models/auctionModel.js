import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const auctionModel = sequelize.define("Auction", {
    auctionId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    offer:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    highestBid:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startedAt:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    endedAt:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    tableName:"Auction",
    timestamps: false,
}
);

sequelize.sync();

