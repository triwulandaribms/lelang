const express = require('express');
const cookieParser = require('cookie-parser');

const { syncDatabase } = require('./models/relasi.js');
const { createDatabase } = require('./scripts/createDatabase.js');
const { sequelize } = require('./config/db.js');

const adminRoutes = require('./routes/admin.routes.js');
const sellerRoutes = require('./routes/seller.routes.js');
const buyerRoutes = require('./routes/buyer.routes.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/buyer', buyerRoutes);

(async () => {
  try {
    await createDatabase();

    try {

      await sequelize.authenticate();
      console.log('Terhubung ke basis data');
  
    } catch (error) {
      console.error('Gagal terhubung ke basis data:', error.message);
    }

    await syncDatabase();

    app.listen(3000, () => {
      console.log('Server berjalan di port 3000');
    });
  } catch (error) {
    console.error('Gagal setup awal:', error.message);
  }
})();
