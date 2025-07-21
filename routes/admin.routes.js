const express = require('express');
const {
  login,
  registrasi,
  listSeller,
  listBuyer,
  listAuction,
  statusToApproved,
  statusToReject,
  deletSeller,
  deletBuyer,
  cekEmail,
  logout
} = require('../controller/admin.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/registrasi', registrasi);
router.post('/login', login);
router.get('/list-seller', authMiddleware, listSeller);
router.get('/list-buyer', authMiddleware, listBuyer);
router.delete('/delete-seller/:id', authMiddleware, deletSeller);
router.delete('/delete-buyer/:id', authMiddleware, deletBuyer);
router.get('/list-auction', authMiddleware, listAuction);
router.put('/status-approved', authMiddleware, statusToApproved);
router.put('/status-reject', authMiddleware, statusToReject);
router.post('/cekEmail', authMiddleware, cekEmail);
router.post('/logout', authMiddleware, logout);

module.exports = router;
