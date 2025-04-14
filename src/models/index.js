// import  { sequelize } from "../config/db.js";
// import  User  from "./userModel.js";
// // import Penjual from "./penjualModel.js";
// // import Kota from "./kotaModel.js";
// // import Post from "./postModel.js";
// // import Mahasiswa from "./mahasiswaModel.js";
// // import MataKuliah from "./mataKuliahModel.js";


// // UNTUK RELASI TABEL

// // ONE TO ONE
// // const penjual = sequelize.define("Penjual",Penjual,{
// //     tableName:"Penjual",
// //     underscored:true,
// // });

// // const kota = sequelize.define("Kota", Kota,{
// //     tableName:"Kota",
// //     underscored:true,

// // });

// // kota.hasOne(penjual,{
// //     foreignKey:"kotaId",
// //     onDelete:"RESTRICT",
// //     onUpdate:"RESTRICT",
// // });

// // // ONE TO MANY
// // const post = sequelize.define("Post",Post,{
// //     tableName:"Post",
// //     underscored:true,
// //     timestamp:false,
// // });


// // User.hasMany(post,{
// //     foreignKey:"userId",
// //     onDelete:"RESTRICT",
// //     onUpdate:"RESTRICT",
// // });

// // post.belongsTo(User, {
// //     foreignKey:"userId",
// //     onDelete:"RESTRICT",
// //     onUpdate:"RESTRICT",
// // });

// // // MANY TO MANY
// // const mahasiswa=sequelize.define("Mahasiswa", Mahasiswa,{
// //     tableName:"Mahasiswa",
// //     underscored:true,
// // });

// // const mataKuliah=sequelize.define("MataKuliah", MataKuliah,{
// //     tableName:"MataKuliah",
// //     underscored:true,
// // });

// // mahasiswa.belongsTo(mataKuliah, {
// //     through:"MahasiswaMataKuliah",
// //     foreignKey:"mahasiswaId",
// //     onDelete:"RESTRICT",
// //     onUpdate:"RESTRICT",
// // });


// sequelize.define("User", User, 
//     { tableName: "users",
//         // force:true,
//     // timestamp:false, (fungsinya buat hialngin createdAt dan updatedAt)
//     // underscored:true,
//     // freezeTableName:true, (fungsinya buat agar nama tabel sesuai dengan apa yg ditulis, namun jika pake ini jangan ada tableName)
//     // indexes: [
//     //     {
//     //         fields: ["email"],
//     //         unique:true,
//     //     },
//     //     {
//     //         fields: ["namaUser"],
//     //     },
//     // ]

//     //  UNTUK SETTER DAN GETTER
//         indexes: [
//         {
//             fields: ["email"],
//             unique:true,
//         },
//     ]

//     });

// sequelize.sync();

// export default sequelize;