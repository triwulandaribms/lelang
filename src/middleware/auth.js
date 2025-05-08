import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

  const cekTokenAuth = req.headers.authorization;

  if (!cekTokenAuth) {
    return res.status(401).json({ message: "Mohon masukkan token." });
  }

  const token = cekTokenAuth.split(" ")[1];

  try {

    const cekToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = cekToken;

    if (req.baseUrl.includes("/admin") && cekToken.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak. Hanya admin yang bisa mengakses." }); 
    } 

    if (req.baseUrl.includes("/seller") && cekToken.role !== "seller") {
      return res.status(403).json({ message: "Akses ditolak. Hanya seller yang bisa mengakses." });
    } 
    
    if (req.baseUrl.includes("/buyer") && cekToken.role !== "buyer") {
      return res.status(403).json({ message: "Akses ditolak. Hanya buyer yang bisa mengakses." });
    }

    next();

  } catch (err) {
    console.log("ERROR", err.message);
      return res.status(401).json({ message: "Token tidak valid." });
    

  }
}

export default authMiddleware;

