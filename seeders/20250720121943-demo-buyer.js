"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Master_Admins", [
      {
        name: "Budi Santoso",
        email: "budi@example.com",
        password: "$2b$10$eMTLtZ5L3Y6R5ndmfIUtQ.Ozj2z2bwhDPmxjBQivF9zBkT62QXW96",
        created_at: new Date(),     
        updated_at: new Date()
      },
      {
        name: "Siti Aminah",
        email: "siti@example.com",
        password: "$2b$10$eMTLtZ5L3Y6R5ndmfIUtQ.Ozj2z2bwhDPmxjBQivF9zBkT62QXW96",
        created_at: new Date(),     
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Master_Admins", null, {});
  }
};
