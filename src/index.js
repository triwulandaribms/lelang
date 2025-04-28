import express from "express";
import cookieParser from "cookie-parser";
import {
  login,
  registrasi,
  listUser,
  listUserByStatus,
  statusToApproved,
  statusToReject,
  deletUser,
  cekEmail,
  logout } from "./controller/admin.js";

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
    createBidding
  } from "./controller/buyer.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
app.use(express.json());
const router = express.Router();
app.use(cookieParser());

// ROUTE ADMIN
router.post("/registrasi", registrasi);
router.post("/login", login);
router.get("/list-user", listUser);
router.delete("/delete-user", deletUser);
router.get("/list-user:/status", listUserByStatus);
router.put("/status-approved", statusToApproved);
router.put("/status-reject", statusToReject);
router.post("/cekEmail", cekEmail);
router.post("/logout", logout);

router.use(authMiddleware); 
// ROUTE SELLER
router.post("/registrasi-seller", registrasiSeller);
router.post("/login-seller",loginSeller);
router.put("/reset-password-seller", resetPasswordSeller);
router.put("/update-profile-seller", updateProfileSeller);
router.post("/create-auction", createAuction);

// ROUTE BUYER
router.post("/registrasi-buyer", registrasiBuyer);
router.post("/login-buyer", loginBuyer);
router.put("/reset-password-buyer", resetPasswordBuyer);
router.put("/update-profile-buyer", updateProfileBuyer);
router.get("/list-auction:/status", listAuctionByApproved);
router.post("/create-bidding", createBidding);

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server berhasil berjalan di port 3000.");
});

