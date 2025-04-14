import express from "express";
import cookieParser from "cookie-parser";
import login from "./controller/login.js";
import {
  seeUser, 
  addUser, 
  getUserByEmail, 
  updateUserByEmail} from "./controller/users.js";
import auth from "./middleware/auth.js";
const app = express();
app.use(express.json());
const router = express.Router();

app.use(cookieParser());
router.use("/login", login);

router.use(auth); 
router.get("/see",seeUser);
router.get("/byEmail/:email", getUserByEmail);
router.post("/add",addUser);
router.put("/updateByEmail/:email", updateUserByEmail);
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server berhasil berjalan di port 3000.");
});

