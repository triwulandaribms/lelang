import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const auctionModel = sequelize.define("Auction", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nama_barang:{
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    harga_awal:{
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    waktu_mulai:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    waktu_akhir:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: " Waiting Approval "
    }
},
{
    tableName:"Auction",
}
);

sequelize.sync();

