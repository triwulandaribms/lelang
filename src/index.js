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
// import {
//   seeUser, 
//   addUser, 
//   getUserByEmail, 
//   updateUserByEmail} from "./controller/users.js";
import auth from "./middleware/auth.js";

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

router.use(auth); 
// ROUTE SELLER
router.post("/registrasi", registrasiSeller);
router.post("/login",loginSeller);
router.put("/reset-password", resetPasswordSeller);
router.put("/update-profile", updateProfileSeller);
router.post("/create-auction", createAuction);

// ROUTE BUYER
router.post("/registrasi", registrasiBuyer);
router.post("/login", loginBuyer);
router.put("/reset-password", resetPasswordBuyer);
router.put("/update-profile", updateProfileBuyer);
router.get("/list-auction:/status", listAuctionByApproved);
router.post("/create-bidding", createBidding);

///////////////////////////////////////////////
// router.get("/byEmail/:email", getUserByEmail);
// router.post("/add",addUser);
// router.put("/updateByEmail/:email", updateUserByEmail);
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server berhasil berjalan di port 3000.");
});

