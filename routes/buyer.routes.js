const express = require('express');
const {
  loginUser,
  resetPasswordBuyer,
  listAuctionByApprovedByBuyer,
  createAuctionBiddingByBuyer,
  updateProfileUser
} = require('../controller/user.js');
const authMiddleware = require('../middleware/auth.js');

const router = express.Router();

router.post('/login-buyer', loginUser);
router.put('/reset-password-buyer/:email', authMiddleware, resetPasswordBuyer);
router.put('/update-profile-buyer/:email', authMiddleware, updateProfileUser);
router.get('/list-auction', authMiddleware,listAuctionByApprovedByBuyer);
router.post('/create-bidding', authMiddleware, createAuctionBiddingByBuyer);

module.exports = router;
