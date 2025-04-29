// import jwt from "jsonwebtoken";

// function authMiddleware(req, res, next){

//     const token  = req.cookies.dataJwt;
//     // console.log("HAHAHAHAHAHA" + token);
//     if(token){
//         try {
//             req.user = jwt.verify(token, process.env.SECRET_KEY);
//             if(req.method === "GET" || req.method === "POST"){
//                 next();
//             }else{
//                 res.status(401).send("Anda tidak diizinkan melakukan tindakan ini.");
//             }
//         } catch{
//             res.status(401).send("Token tidak valid");
//         }
//     }else{
//         res.status(401).send("Anda belum login");
//     }
// }


// export default authMiddleware;


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

    if (req.path.includes("/admin") && cekToken.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak. Hanya admin yang bisa mengakses." });
    } 
    
    if (req.path.includes("/seller") && cekToken.role !== "seller") {
      return res.status(403).json({ message: "Akses ditolak. Hanya seller yang bisa mengakses." });
    } 
    
    if (req.path.includes("/buyer") && cekToken.role !== "buyer") {
      return res.status(403).json({ message: "Akses ditolak. Hanya buyer yang bisa mengakses." });
    }

    next();

  } catch (err) {

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token telah kadaluarsa. Silakan login kembali." });
    } else {
      return res.status(401).json({ message: "Token tidak valid." });
    }
    
  }
}

export default authMiddleware;

