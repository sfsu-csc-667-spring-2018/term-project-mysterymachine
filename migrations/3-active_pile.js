'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('active_pile', {
   game_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'games',
     key: 'game_id'
    }
   },
   card_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'cards',
     key: 'card_id'
    }
   },
   card_order: {
    type: Sequelize.INTEGER
   }
  }).then(function () {
   return queryInterface.sequelize.query(
    `ALTER TABLE active_pile ADD CONSTRAINT active_pile_unique UNIQUE(game_id, card_id)`
   );
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('active_pile');
 }
};
