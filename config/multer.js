const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.xls', '.xlsx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Hanya file PDF atau Excel yang diperbolehkan'), false);
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

module.exports = multer({ storage, fileFilter });
