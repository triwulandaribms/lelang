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

  const  cekAuthHeader= req.headers.authorization;

  if (cekAuthHeader) {

    const token = cekAuthHeader.split(" ")[1];;
    try {
      req.user = jwt.verify(token, process.env.SECRET_KEY);

      // Bisa kasih kontrol berdasarkan role di sini kalau mau
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }

  } else {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }
}

export default authMiddleware;
