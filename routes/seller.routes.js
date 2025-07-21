const express = require('express');
const {
  registrasiSeller,
  loginSeller,
  resetPasswordSeller,
  updateProfileSeller,
  createAuction
} = require('../controller/seller.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/registrasi-seller', authMiddleware, registrasiSeller);
router.post('/login-seller', loginSeller);
router.put('/reset-password-seller/:id', authMiddleware, resetPasswordSeller);
router.put('/update-profile-seller/:id', authMiddleware, updateProfileSeller);
router.post('/create-auction', authMiddleware, createAuction);

module.exports = router;
