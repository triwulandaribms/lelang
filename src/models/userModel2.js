import { sequelize } from "../config/db.js";
// import { DataTypes } from "sequelize";
import { DataTypes, Model } from "sequelize";

// CARA 1
export const User = sequelize.define("User",{
    userId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    namaUser:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.TIME,
        allowNull:true
    },
    updatedAt:{
        type: DataTypes.TIME,
        allowNull:true
    }
    
},
{
    tableName:"users",
}

);

sequelize.sync();

// CARA 2

// class User extends Model {}

// User.init({
//     user_id:{
//         type: DataTypes.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//         allowNull:false
//     },
//     namaUser:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email:{
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// },
//     {
//         sequelize,
//         tableName: "users",
    
//     })

// sequelize.sync();
// export default User;
