const { userModel } = require('../models/userModel.js');
const { auctionBiddingModel } = require('../models/auctionBiddingModel.js');
const { auctionModel } = require('../models/auctionModel.js');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registrasiUser(req, res) {
  try {

    const { name, email, password, role} = req.body;
 
    let cekEmail= false;
    let cekEmailSoftHapus= false;
    let cekPassword  = false;
    let emailUser = null;

   if (!['buyer', 'seller'].includes(role)) {
    return res.status(400).json({ message: "Role harus buyer atau seller" });
  }

 
  const dataUser = await userModel.findAll({ 
     attributes: ['id','email','password','deleted_at','deleted_by'], 
    });
    
  for(const user of dataUser){
    if(user.email === email){
      emailUser = user;
      if(user.deleted_at === null && user.deleted_by === null){
        cekEmail = true;
      }else{
        cekEmailSoftHapus = true;
      }
    }

    if(user.deleted_at === null && user.deleted_by === null){
      const cekPasswordSama = await bcrypt.compare(password, user.password);
      if(cekPasswordSama){
        cekPassword = true;
        break;
      }
    }
  }

  if(cekPassword && cekEmail){
    return res.status(400).json({
      message: "Email dan password ini sudah pernah digunakan."
    });
  }

  if(cekPassword){
    return res.status(400).json({
      message: "Password ini sudah pernah digunakan."
    });
  }
  
  if(cekEmail){
    return res.status(400).json({
      message: "Email sudah pernah terdaftar."
    });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  if(cekEmailSoftHapus && emailUser){
    await userModel.update(
      {
        name,
        password:hash,
        role,
        deleted_at:null,
        deleted_by:null,
      },
      { where: {email}}
    );

    return res.status(200).json({
      message: "Berhasil registrasi (akun lama diaktifkan ulang)."
    });
  }

  await userModel.create({
    name,
    email,
    password:hash,
    role,
  });

  return res.status(201).json({
    message:"Berhasil registrasi."
  });

  } catch (error) {
    console.error("Gagal registrasi user:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password, role} = req.body;

    if(!email || !password || !role){
      return res.status(400).json({ message: "email, password dan role wajib di isi"});
    }

    if (!["buyer", "seller"].includes(role)) {
      return res.status(400).json({ message: "role harus buyer atau seller" });
    }

    const cekData = await userModel.findAll();

    if (cekData.length === 0) {
      return res.status(404).json({ message: "data user tidak ditemukan.mohon lakukan registrasi terlebih dahulu" });
    } else {
      const cekUser = await userModel.findOne({
        where: { 
          email, 
          role,
          deleted_at:null,
          deleted_by:null 
        },
        attributes: ['id', 'name', 'password', 'email', 'role']
      });

      if (!cekUser) {
        return res.status(404).json({ message: "email atau role tidak ditemukan" });
      }

      const hash = await bcrypt.compare(password, cekUser.password);

      if (!hash) {
        return res.status(401).json({ message: "password salah" });
      }

      const dataJwt = jwt.sign({
        id: cekUser.id,
        name: cekUser.name,
        email: cekUser.email,
        role: cekUser.role,
      }, process.env.SECRET_KEY);

      res.status(200).json({ message: "Berhasil login", token: `${dataJwt}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function resetPasswordBuyer(req, res) {
  try {
    const { id } = req.params;
    const { passwordBaru } = req.body;

    if (!passwordBaru) {
      return res.status(400).json({ message: "Password baru wajib diisi." });
    }

    const user = await userModel.findOne({ 
      where: { 
        id, 
        role: "buyer",
        deleted_at:null,
        deleted_by:null 
      }
    });

    if (!user) {
      return res.status(404).json({ message: "buyer tidak ditemukan." });
    }

    const cekPassword = await bcrypt.compare(passwordBaru, user.password);
    if (cekPassword) {
      return res.status(400).json({ message: "password baru tidak boleh sama dengan password lama." });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(passwordBaru, salt);

    await user.update({ password: hash });

    return res.status(200).json({ message: "password buyer berhasil direset." });

  } catch (error) {
    console.error("reset password buyer error:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

async function resetPasswordSeller(req, res) {
  try {
    const { id } = req.params;
    const { passwordBaru } = req.body;

    if (!passwordBaru) {
      return res.status(400).json({ message: "password baru wajib diisi." });
    }

    const user = await userModel.findOne({ 
      where: { 
        id, 
        role: "seller",
        deleted_at:null,
        deleted_by:null, 
      }
    });

    if (!user) {
      return res.status(404).json({ message: "seller tidak ditemukan." });
    }

    const cekPassword = await bcrypt.compare(passwordBaru, user.password);
    if (cekPassword) {
      return res.status(400).json({ message: "password baru tidak boleh sama dengan password lama." });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(passwordBaru, salt);

    await user.update({ password: hash });

    return res.status(200).json({ message: "password seller berhasil direset." });

  } catch (error) {
    console.error("reset password seller error:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

async function updateProfileUser(req, res) {
  try {
    const { id } = req.params;
    const { email, name, role } = req.body;

    const user = await userModel.findOne({ 
      where: { 
          id, 
          role,
          deleted_at:null,
          deleted_by:null 
      }
    });

    if (!user) {
      return res.status(404).json({ message: `user dengan role ${role} tidak ditemukan.` });
    }

    const cekEmail = await userModel.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
        deleted_at:null,
        deleted_by:null,
      },
    });

    if (cekEmail) {
      return res.status(409).json({ message: "email sudah digunakan oleh user lain." });
    }

    await user.update({ email, name });

    return res.status(200).json({ message: `${role} berhasil update profil.` });

  } catch (error) {
    console.error("update profile error:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

async function listAuctionByApprovedByBuyer(_req, res) {
  try {
    const approvedAuction = await auctionModel.findAll({ where: { status: "approved" } });

    res.status(200).json({ data: approvedAuction });
  } catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function createAuctionBiddingByBuyer(req, res) {
  try {
    const { auctionId, harga_tawar } = req.body;

    const cekStatusAuction = await auctionModel.findOne({
      where: { id: auctionId, status: "approved" }
    });

    if (!cekStatusAuction) {
      return res.status(400).json({ message: "Auction belum disetujui atau approved." });
    }

    const hargaTertinggi = await auctionBiddingModel.findOne({
      where: { auctionId },
      order: [["harga_tawar", "DESC"]]
    });

    if (parseFloat(harga_tawar) <= (hargaTertinggi ? parseFloat(hargaTertinggi.harga_tawar) : parseFloat(cekStatusAuction.harga_awal))) {
      return res.status(400).json({
        message: `Penawaran harus lebih tinggi dari ${hargaTertinggi ? "bid tertinggi sebelumnya" : "harga awal"} (${hargaTertinggi ? hargaTertinggi.harga_tawar : cekStatusAuction.harga_awal})`
      });
    }

    const dataAuctionBidding = await auctionBiddingModel.create({ auctionId, harga_tawar });

    return res.status(201).json({
      message: "Penawaran berhasil dilakukan.",
      json: dataAuctionBidding
    });
  } catch (error) {
    console.error("error:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function createAuctionBySeller(req, res) {
  try {
    const { nama_barang, deskripsi, harga_awal, waktu_mulai, waktu_akhir } = req.body;

    if (!nama_barang || !deskripsi || !harga_awal || !waktu_mulai || !waktu_akhir) {
      return res.status(400).json({ message: "field tidak boleh ada yang kosong" });
    }

    const startTime = new Date(waktu_mulai);
    const endTime = new Date(waktu_akhir);

    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ message: "Format waktu tidak valid" });
    }

    if (endTime <= startTime) {
      return res.status(400).json({ message: "Waktu akhir harus lebih besar dari waktu mulai." });
    }

    const dataAuction = await auctionModel.create({
      nama_barang,
      deskripsi,
      harga_awal,
      waktu_mulai: startTime,
      waktu_akhir: endTime
    });

    return res.status(201).json({
      message: "Auction berhasil dibuat.",
      data: dataAuction
    });
  } catch (error) {
    console.error("Error creating auction:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}

module.exports = {
  registrasiUser,
  loginUser,
  resetPasswordBuyer,
  resetPasswordSeller,
  updateProfileUser,
  listAuctionByApprovedByBuyer,
  createAuctionBiddingByBuyer,
  createAuctionBySeller
};
