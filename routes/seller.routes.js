const express = require('express');
const {
  loginUser,
  resetPasswordSeller,
  createAuctionBySeller,
  updateProfileUser
} = require('../controller/user.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/login-seller', loginUser);
router.put('/reset-password-seller/:id', authMiddleware, resetPasswordSeller);
router.put('/update-profile-seller/:id', authMiddleware,updateProfileUser);
router.post('/create-auction', authMiddleware, createAuctionBySeller);

module.exports = router;
