'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('cards', {
   card_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   description: {
    type: Sequelize.TEXT
   },
   face: {
    type: Sequelize.TEXT
   },
   color: {
    type: Sequelize.TEXT
   },
   value: {
    type: Sequelize.INTEGER
   },
   image_address: {
    type: Sequelize.TEXT
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('cards');
 }
};
