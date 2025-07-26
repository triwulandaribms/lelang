const express = require('express');
const {
  login,
  registrasi,
  listUserByRole,
  listAuction,
  statusToApproved,
  statusToReject,
  cekEmail,
  logout,
  deleteUser,
  uploadFile,
  filePdf, 
  fileExcel
} = require('../controller/admin.js');
const { registrasiUser } = require ('../controller/user.js');
const authMiddleware = require('../middleware/auth.js');
const upload = require('../config/multer.js');

const router = express.Router();


router.post('/registrasi', registrasi);
router.post('/login', login);
router.post('/registrasi-seller', authMiddleware, registrasiUser);
router.post('/registrasi-buyer', authMiddleware, registrasiUser);
router.get('/list-user', authMiddleware, listUserByRole);
router.put('/delete-user/:id', authMiddleware, deleteUser);
router.get('/list-auction', authMiddleware, listAuction);
router.put('/status-approved', authMiddleware, statusToApproved);
router.put('/status-reject', authMiddleware, statusToReject);
router.post('/cekEmail', authMiddleware, cekEmail);
router.post('/logout', authMiddleware, logout);
router.post('/upload', upload.single('document'), uploadFile);
router.get('/export/pdf', authMiddleware, filePdf);
router.get('/export/excel', authMiddleware, fileExcel);

module.exports = router;
