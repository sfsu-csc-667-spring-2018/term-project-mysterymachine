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
          model:'users',
          key:'user_id'
        }
      },
      turn_order: {
        type: Sequelize.INTEGER
      },
     active_seat: {
        type: Sequelize.INTEGER
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
