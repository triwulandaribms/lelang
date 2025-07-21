const express = require('express');
const {
  registrasiBuyer,
  loginBuyer,
  resetPasswordBuyer,
  updateProfileBuyer,
  listAuctionByApproved,
  createAuctionBidding
} = require('../controller/buyer.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/registrasi-buyer', authMiddleware, registrasiBuyer);
router.post('/login-buyer', loginBuyer);
router.put('/reset-password-buyer/:id', authMiddleware, resetPasswordBuyer);
router.put('/update-profile-buyer/:id', authMiddleware, updateProfileBuyer);
router.get('/list-auction', authMiddleware, listAuctionByApproved);
router.post('/create-bidding', authMiddleware, createAuctionBidding);

module.exports = router;
