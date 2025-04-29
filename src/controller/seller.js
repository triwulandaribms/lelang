import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sellerModel } from "../models/sellerModel.js";
// import { auction } from "../models/auctionModel.js";

export async function registrasiSeller(req, res) {
  try {

    const { name, email, password } = req.body;

    const data = await sellerModel.findAll({ attributes: ["name", "email", "password", "role"] });

    if (data.some(seller => seller.email === email)) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    for (const seller of data) {
      const cekPassword = await bcrypt.compare(password, seller.password);
      if (cekPassword) {
        return res.status(400).json({ message: "Password ini sudah pernah digunakan. Gunakan password lain." });
      }
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    await sellerModel.create({
      name,
      email,
      password: hash,
    });

    return res.status(201).json({ message: "Akun seller berhasil dibuat." });
  } catch (error) {
    console.error("Gagal registrasi seller:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

export async function loginSeller(req, res){

  try {
    const { email, password } = req.body;

    const cekData = await sellerModel.findAll();
    

    if (cekData.length === 0){

      return res.status(404).json({message: "data seller tidak ditemukan.Mohon lakukan registrasi terlebih dahulu"});

    }else{

      const cekEmail = await sellerModel.findOne({
        where: { email },
        attributes: ['id', 'name', 'password', 'email', 'role']
      });
  
      if (!cekEmail) {
        return res.status(404).json({ message: "Email tidak ditemukan" });
      }
  
      const hash = await bcrypt.compare(password, cekEmail.password);
  
      if (!hash) {
        return res.status(401).json({ message: "Password salah" });
      }

  
      const dataJwt = jwt.sign({
        id: cekEmail.id,
        name: cekEmail.name,
        email: cekEmail.email,
        role: cekEmail.role,
      },process.env.SECRET_KEY);
  
  
      res.status(200).json({ message: "Berhasil login", token: `${dataJwt}`});
  
  
    }
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

export async function resetPasswordSeller(req, res) {

  try {
    const { id } = req.params;
    const { passwordBaru } = req.body;

    const seller = await sellerModel.findByPk(id);

    if (!seller) {
      return res.status(404).json({ message: "Data seller tidak ditemukan." });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(passwordBaru, salt);

    await sellerModel.update(
      { password: hash }, { where: { id } });

    res.status(200).json({ message: "Password berhasil direset." });
      
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

export async function updateProfileSeller(req, res){

  try {

   const {id} = req.params;
   const { email, name } = req.body;

   const cekData = await sellerModel.findAll({ attributes: ["name", "email", "password"] });

    if(cekData){
      if (cekData.some(seller => seller.email === email)) {
        return res.status(409).json({ message: "Email sudah terdaftar sebelumnya." });
      }

      const result = await sellerModel.update({
        email,
        name
      }, {where: id });

      res.status(201).json({ message: "Profil berhasil diupdate." });
  
    }else{
      return res.status(404).json({ message: "Data seller tidak ditemukan." });
    }

  } catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

export async function  createAuction(req, res){

}

