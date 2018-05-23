'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('games', {
   game_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   game_status: {
    type: Sequelize.TEXT
   },
   host_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
     model: 'users',
     key: 'user_id'
    }
   },
   top_card_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'cards',
     key: 'card_id'
    }
   },
   top_card_color: {
    type: Sequelize.STRING
   },
   turn_order: {
    type: Sequelize.INTEGER
   },
   active_seat: {
    type: Sequelize.INTEGER
   },
   skipped: {
    type: Sequelize.BOOLEAN
   },
   has_drawn: {
    type: Sequelize.BOOLEAN
   },
   game_start: {
    type: Sequelize.DATE
   }
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('games');
 }
};
