import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const sellerModel = sequelize.define("Seller", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "seller",
    }
},
{
    tableName:"Seller",
    timestamps: false,
}
);

sequelize.sync();