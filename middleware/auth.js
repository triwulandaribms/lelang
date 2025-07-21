const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const cekTokenAuth = req.headers.authorization;

  if (!cekTokenAuth) {
    return res.status(401).json({ message: 'Mohon masukkan token.' });
  }

  const token = cekTokenAuth.split(' ')[1];

  try {
    const cekToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = cekToken;

    console.log('TOKEN:', cekToken);
    const path = req.baseUrl || '';
    console.log('ROLE:', cekToken.role);
    console.log('BASE URL:', path);

    if (path.includes('/api/admin') && cekToken.role !== 'admin') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengakses.' });
    }

    if (path.includes('/api/seller') && cekToken.role !== 'seller') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya seller yang bisa mengakses.' });
    }

    if (path.includes('/api/buyer') && cekToken.role !== 'buyer') {
      return res.status(403).json({ message: 'Akses ditolak. Hanya buyer yang bisa mengakses.' });
    }

    next();
  } catch (err) {
    console.log('ERROR:', err.message);
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
}

module.exports = authMiddleware;
