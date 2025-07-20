'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Master_auctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      harga_awal: {
        type: Sequelize.DECIMAL
      },
      waktu_mulai: {
        type: Sequelize.DATE
      },
      waktu_akhir: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      create_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW') 
      },
      updated_by: {
        type: Sequelize.STRING
      },
      updated_at: {
        type: Sequelize.DATE
      },
      deleted_by: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Master_auctions');
  }
};