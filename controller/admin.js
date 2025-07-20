const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminModel } = require('../models/adminModel.js');
const { sellerModel } = require('../models/sellerModel.js');
const { buyerModel } = require('../models/buyerModel.js');
const { auctionModel } = require('../models/auctionModel.js');

async function registrasi(req, res) {
  try {
    const { name, email, password } = req.body;

    const data = await adminModel.findAll({ attributes: ['name', 'email', 'password'] });

    if (data.some(akun => akun.email == email)) {
      res.status(201).json({ message: "email sudah pernah untuk mendaftar" });
    } else {
      for (const akun of data) {
        const cekPassword = await bcrypt.compare(password, akun.password);
        if (cekPassword) {
          return res.status(400).json({ message: "Password ini sudah pernah digunakan. Gunakan password lain." });
        }
      }

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      await adminModel.create({
        name,
        email,
        password: hash,
      });
      res.status(401).json({ message: "Akun berhasil ditambahkan." });
    }
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const cekData = await adminModel.findAll();

    if (cekData.length === 0) {
      return res.status(404).json({ message: "data admin tidak ditemukan.Mohon lakukan registrasi terlebih dahulu" });
    } else {
      const cekEmail = await adminModel.findOne({
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
      }, process.env.SECRET_KEY);

      res.status(200).json({ message: "Berhasil login", token: `${dataJwt}` });
    }
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function listSeller(_req, res) {
  try {
    const dataSeller = await sellerModel.findAll();
    res.status(200).json({ data: dataSeller });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function listBuyer(_req, res) {
  try {
    const dataBuyer = await buyerModel.findAll();
    res.status(200).json({ data: dataBuyer });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function deletSeller(req, res) {
  try {
    const { id } = req.params;

    await sellerModel.destroy({ where: { id } });

    res.status(201).json({ message: `Data seller sudah terhapus` });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function deletBuyer(req, res) {
  try {
    const { id } = req.params;

    await buyerModel.destroy({ where: { id } });

    res.status(201).json({ message: `Data buyer sudah terhapus` });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function listAuction(_req, res) {
  try {
    const dataAuction = await auctionModel.findAll();
    res.status(200).json({ data: dataAuction });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function statusToApproved(req, res) {
  try {
    const { id } = req.query;
    const { status } = req.body;

    const dataAuction = await auctionModel.findOne({
      where: { id },
      attributes: ['status']
    });

    if (!dataAuction) {
      return res.status(404).json({ message: "Data auction tidak ditemukan." });
    }

    if (dataAuction.status.trim().toLowerCase() === "approved") {
      return res.status(400).json({ message: "Auction sudah diset ke status Approved." });
    }

    await auctionModel.update({ status }, { where: { id } });

    res.status(201).json({ message: "berhasil lelang dimulai" });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function statusToReject(req, res) {
  try {
    const { id } = req.query;
    const { status } = req.body;

    const dataAuction = await auctionModel.findOne({
      where: { id },
      attributes: ['status']
    });

    if (!dataAuction) {
      return res.status(404).json({ message: "Data auction tidak ditemukan." });
    }

    if (dataAuction.status.trim().toLowerCase() === "rejected") {
      return res.status(400).json({ message: "Auction sudah diset ke status Rejected." });
    }

    if (dataAuction.status.trim().toLowerCase() !== "approved") {
      return res.status(400).json({ message: "Data auction tidak berstatus approved." });
    }

    await auctionModel.update({ status }, { where: { id } });

    res.status(201).json({ message: "berhasil pembatalan pelelangan" });
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function cekEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email tidak boleh kosong",
      });
    }

    const akun = await adminModel.findOne({ where: { email } });

    if (akun) {
      return res.status(200).json({
        status: "success",
        message: "Email ditemukan di database",
        data: { email },
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Email tidak ditemukan di database",
      });
    }
  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function logout(_req, res) {
  res.clearCookie("dataJwt").send("Logout berhasil");
}

module.exports = {
  registrasi,
  login,
  listSeller,
  listBuyer,
  deletSeller,
  deletBuyer,
  listAuction,
  statusToApproved,
  statusToReject,
  cekEmail,
  logout,
};
