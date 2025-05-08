import express from "express";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/auth.js";

import {
  login,
  registrasi,
  listSeller,
  listBuyer,
  listAuction,
  statusToApproved,
  statusToReject,
  deletUser,
  cekEmail,
  logout
} from "./controller/admin.js";

import {
  registrasiSeller,
  loginSeller,
  resetPasswordSeller,
  updateProfileSeller,
  createAuction
} from "./controller/seller.js";

import {
  registrasiBuyer,
  loginBuyer,
  resetPasswordBuyer,
  updateProfileBuyer,
  listAuctionByApproved,
  createAuctionBidding
} from "./controller/buyer.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const router = express.Router();

// ADMIN ROUTES
const adminRouter = express.Router();

adminRouter.post("/registrasi", registrasi);
adminRouter.post("/login", login); 
adminRouter.get("/list-seller", authMiddleware, listSeller);
adminRouter.get("/list-buyer", authMiddleware, listBuyer);
adminRouter.delete("/delete-user", authMiddleware, deletUser);
adminRouter.get("/list-auction", authMiddleware, listAuction);
adminRouter.put("/status-approved", authMiddleware, statusToApproved);
adminRouter.put("/status-reject", authMiddleware, statusToReject);
adminRouter.post("/cekEmail", authMiddleware, cekEmail);
adminRouter.post("/logout", authMiddleware, logout);

// SELLER ROUTES
const sellerRouter = express.Router();

adminRouter.post("/registrasi-seller", authMiddleware, registrasiSeller); 
sellerRouter.post("/login-seller", loginSeller); 
sellerRouter.put("/reset-password-seller/:id", authMiddleware, resetPasswordSeller);
sellerRouter.put("/update-profile-seller/:id", authMiddleware, updateProfileSeller);
sellerRouter.post("/create-auction", authMiddleware, createAuction);

// BUYER ROUTES
const buyerRouter = express.Router();

adminRouter.post("/registrasi-buyer", authMiddleware, registrasiBuyer); 
buyerRouter.post("/login-buyer", loginBuyer);
buyerRouter.put("/reset-password-buyer/:id", authMiddleware, resetPasswordBuyer);
buyerRouter.put("/update-profile-buyer/:id", authMiddleware, updateProfileBuyer);
buyerRouter.get("/list-auction/:status", authMiddleware, listAuctionByApproved);
buyerRouter.post("/create-bidding", authMiddleware, createAuctionBidding);

router.use("/admin", adminRouter);
router.use("/seller", sellerRouter);
router.use("/buyer", buyerRouter);

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server berjalan di port 3000.");
});
