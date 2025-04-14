import { sequelize } from "../config/db.js";
import { User } from "../models/userModel2.js";
import { Op, Sequelize } from "sequelize";
// import  User from "../models/userModel2.js";
// import db from "../models/index.js";
// const User = db.models.User; 

export async function seeUser(_req, res) {
  try {
    // select email as user_email, nama_user as nama_user from users;
    //  select age,count(age) as jumlah from users;
    //  select age, email, nama_user from users where age = 20;
    //  select age, email, nama_user from users where user_id IN (1,2,3) and  email like 'users';

    // INI QUERY SQUELIZENYA
    // let dataUser = await User.findAll({
    //   attributes:[
    //    ["email","user_email"] 
    //    ["namaUser", "nama_user"],
    //   ]
      // attributes:[
      //   "age",
      //   (sequelize.fn("count", sequelize.col("age")), "jumlah"),
      //  ],

      // attributes:["age","email","namaUser"],
      // where :{
      //   age:{
      //     [Op.eq]: 20
      //   }
      // }

      // attributes:["age","email","namaUser"],
      //   where:[
      //     userId:[1,2,3],
      //     [Op.and]:[
      //       {
      //         email:{
      //           [op.like]: "users",
      //         },
      //       },
      //     ],
      //   ],

      // INI UNTUK SEQUELIZE QUERY ROWS

      // let dataUser = await Sequelize.query(
      //   "select * from users",{
      //     type: sequelize.QueryTypes.SELECT
      //   },
      // );

      // let dataUser = await Sequelize.query(
      //   "select * from users",{
      //     model: User,
      //     mapToModel: true,
      //   }, 

      // );

      //  CONTOH QUERY BERTINGKAT ATAU NESTED QUERY
      // let dataUser = await Sequelize.query(
      //   "select 1 as 'foo.bar.baz'",{
      //     nest:true,
      //     type:sequelize.queryTypes.SELECT,
      //   },

      // );

      // CONTOH QUERY PARAMS
      // let dataUser = await Sequelize.query(
      //   "select * from users where isActive = 1",{
      //     replacement:(true),
      //     type:sequelize.queryTypes.SELECT,
      //   },

      // );

      // QUERY untuk many to many
  //     let dataUser = await db.model.Post.findAll({
  //       include:[
  //         {
  //           model:User,
  //           where:{
  //             email:{
  //               [Op.like]:"pojok@gmail.com",
  //             },
  //           },
  //         },       
  //     ],
  //     where:{
  //       title:"testing"
  //     },
  //     limit: 10,
  //     offset:0,
  // });
  //  ATAU BISA SEPERTI DIBAWAH INI

  // const dataUser = await db.query(
  //   "select users.*, Post.title.Post.body",
  //   "from users join Post on users.userId.Post.userId where users.email like 'pojok@gmail.com'"
  // );

  // const dataUser = await db.query("select * from users",{
  //   type:sequelize.QueryTypes.SELECT,
  //   model:User,
  //   mapToModel:true
  // });

  // const getPost = async (id)=>{
  //   return await db.query("select * from users where userId = id",{
  //     replacements:[id],
  //     type:sequelize.QueryTypes.SELECT,
  //     model:db.model.Post,
  //     mapToModel:true,
  //   });
  // };
 
  // let ddl = await Promise.all(
  //   dataUser.map(async(item)=>{
  //     return {item,
  //       Post: await Promise.all(await getPost(item.userId)),
  //     }
  //   })
  // )

//   res.status(200).json({
//     status: "success",
//     data: ddl, 
  const dataUser = await User.findAll();
    res.status(200).json({
      status: "success",
      data: dataUser, 
    });   

  } catch (error) {
    res.status(400).json({
        status: "error",
        message: error.message,
      });
  }
}

export async function getUserByEmail(req, res) {
    try {
      const { email } = req.params;
  
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        return res.status(200).json({
          status: "success",
          data: user,
        });
      }
  
      res.status(404).json({
        status: "error",
        message: "User dengan email tersebut tidak ditemukan",
      });
  
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  
export async function addUser(req,res){

    try {
      // STATIS create instance
      // let user = User.build({
      //   namaUser: "user1",
      //   email: "user1@user2",
      //   age: 20,
      // });
      // // user.namaUser="pojok kode";
      // user.save().then((data))=>{
      //   res.send(data)
      // }

      // await User.bulkCreate([
      //   {
      //     namaUser: "user1",
      //     email: "user1@user2",
      //     age: 20,
      //   },
      //   {
      //     namaUser: "user1",
      //     email: "user1@user3",
      //     age: 20,
      //   },
      //   {
      //     namaUser: "user1",
      //     email: "user1@user4",
      //     age: 20,
      //   },
       
      // ]).then((data) =>{
      //   res.send(data)
      // });
      
      // UNTUK SETTER DAN GETTER
      await User.bulkCreate([
        {
          firstName:"pojok",
          lastName:"kode",
          userName: "user1",
          password:"123456",
          email: "pojok@gmail.com",
          age: 20,
          isActive:true,
        },   
      ]).then((data) =>{
        res.send(data)
      });
      

      // DINAMIS

        // const {namaUser, email} = req.body;
        // console.log("REQUESTNYAAA", req.body);
        // const newUser = await User.create(
        //     {
        //         namaUser,
        //         email,
        //     });

        //     if(newUser){
        //         res.status(409).json({
        //             status: "error",
        //             message: "Email sudah terdaftar"
        //         });
        //     }else{
        //         res.status(201).json({
        //             status: "success",
        //             message: "user berhasil ditambahkan",
        //             data: newUser
        //         })
        //     }
           
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        })
        console.log(error);
    }
}
  
export async function updateUserByEmail(req, res) {
    try {
      const { email} = req.params;
      const { namaUser } = req.body;
  
      const [updated] = await User.update(
        { namaUser },
        {
          where: { email: email },
        }
      );
  
      if (updated) {
        const updatedUser = await User.findOne({ where: { email } });
        return res.status(200).json({
          status: "success",
          message: "User berhasil diupdate berdasarkan namaUser",
          data: updatedUser,
        });
      }
  
      res.status(404).json({
        status: "error",
        message: "User tidak ditemukan",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  