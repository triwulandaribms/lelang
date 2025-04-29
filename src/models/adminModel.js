import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const adminModel = sequelize.define("Admin", {
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
        defaultValue: "admin",
    }
},
{
    tableName:"Admin",
    timestamps: false,
}
);

sequelize.sync();