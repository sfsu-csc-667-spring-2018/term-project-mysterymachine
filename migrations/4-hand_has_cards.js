'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('hand_has_cards', {
   hand_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: {
     model: 'game_has_hands',
     key: 'hand_id'
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
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('hand_has_cards');
 }
};
