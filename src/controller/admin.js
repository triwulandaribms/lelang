import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { adminModel } from "../models/adminModel.js";

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const cekEmail = await adminModel.findOne({
      where: { email },
      attributes: ['userId', 'name', 'password', 'email', 'role']
    });

    if (!cekEmail) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const hash = await bcrypt.compare(password, cekEmail.password);

    if (!hash) {
      return res.status(401).json({ message: "Password salah" });
    }

    const dataJwt = jwt.sign({
      userId: cekEmail.userId,
      name: cekEmail.name,
      email: cekEmail.email,
      role: cekEmail.role,
    },process.env.SECRET_KEY);

    // console.log(dataJwt);
    // res.cookie("dataJwt", dataJwt);
    res.status(200).json({ message: "Berhasil login", token: `${dataJwt}`});

  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }

}

// Daftar akun
export async function registrasi(req, res) {
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

      await adminModel.create(
        {
          name,
          email,
          password: hash,
        }
      );
      res.status(401).json({ message: "Akun berhasil ditambahkan." });

    }

  } catch (error) {
    console.error("Gagal mendaftar:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }

}

export async function listUser(req, res){

}

export async function deletUser(req, res){

}

export async function listUserByStatus(req, res){

}

export async function statusToApproved(req, res){

}

export async function statusToReject(req, res){

}
// Cek Email Endpoint
export async function cekEmail(req, res){
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email tidak boleh kosong",
      });
    }

    const akun = await adminModel.findOne({where:{email}})

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

// Lupa password
// router.put("/forgout", async (req, res) => {

//   try {

//     const { email, password } = req.body;
//     const akun = await akunModel.findOne({where:{email}})
  
//     if (!akun) {
//       return res.status(404).json({ message: "User tidak ditemukan" });
//     }
  
//     const salt = await bcrypt.genSalt();
//     const hash = await bcrypt.hash(password, salt);
  
//     const updated = await akunModel.update(
//       { hash },
//       { where: { email } }
//     );
  
//     if (updated[0] === 1) {
//       const updatedUser = await cekEmail(email);
//       return res.status(200).json({ message: "Password berhasil diupdate", data: updatedUser });
//     }
  
//     res.status(500).json({ message: "Gagal update password" });
  
//   } catch (error) {
//     console.error("Gagal mendaftar:", error.message);
//     res.status(500).json({ message: "Terjadi kesalahan server" });
//   }
// });

// Logout
export async function logout(_req, res){
  res.clearCookie("dataJwt").send("Logout berhasil");
}

