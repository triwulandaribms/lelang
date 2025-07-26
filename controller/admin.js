const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminModel } = require('../models/adminModel.js');
const { userModel } = require('../models/userModel.js');
const { auctionModel } = require('../models/auctionModel.js');
const { fileModel } = require('../models/fileModel.js');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');


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

async function listUserByRole(req, res) {
  try {
    const { role } = req.query;

    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: "role harus buyer atau seller" });
    }

    const dataUser = await userModel.findAll({
      where: {
        role,
        deleted_at: null,
        deleted_by: null,
      },
      attributes: ['id', 'name', 'email', 'role']
    });

    if (dataUser.length === 0) {
      return res.status(404).json({ message: `Belum ada data untuk role ${role}` });
    }

    return res.status(200).json({ message: `List ${role}`, data: dataUser });

  } catch (error) {
    console.error("Gagal mengambil daftar user:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

async function deleteUser(req, res) {
  try {

    const { id } = req.params;
    const { role } = req.query;
    const user = req.user?.name || "system";

    if (role && !["buyer", "seller"].includes(role)) {
      return res.status(400).json({ message: "role tidak valid. Harus 'buyer' atau 'seller'." });
    }

    const dataUser = await userModel.findOne({
      where: role ? { id, role } : { id }
    });

    if (!dataUser) {
      return res.status(404).json({ message: "user tidak ditemukan." });
    }

    await userModel.update(
      {
        deleted_at: new Date(),
        deleted_by: user
      },
      { where: { id } }
    );

    return res.status(200).json({ message: `user dengan id ${id} berhasil dihapus (soft delete).` });
  } catch (error) {
    console.error("Gagal menghapus user:", error.message);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
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

async function uploadFile  (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File tidak ditemukan' });
    }

    const { filename, path: filePath, mimetype } = req.file;

    const data = await fileModel.create({
      fileName: filename,
      filePath,
      mimeType: mimetype,
    });

    res.status(201).json({ message: 'Upload sukses', data });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Upload gagal' });
  }
}

async function filePdf (_req, res) {
  try {
    const users = await userModel.findAll();

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

    doc.pipe(res);
    doc.fontSize(18).text('List Users', { underline: true });
    doc.moveDown();

    users.forEach((user, i) => {
      doc.fontSize(12).text(`${i + 1}. ${user.name} - ${user.email} (${user.role})`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function fileExcel(_req, res) {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('User');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Email', key: 'email', width: 32 },
    { header: 'Role', key: 'role', width: 32}
  ];

  const users = await userModel.findAll();
  users.forEach(user => {
    worksheet.addRow(user.toJSON());
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

  await workbook.xlsx.write(res);
  res.end();
}

module.exports = {
  registrasi,
  login,
  listUserByRole,
  deleteUser,
  listAuction,
  statusToApproved,
  statusToReject,
  cekEmail,
  logout,
  uploadFile,
  filePdf,
  fileExcel
};
