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
      active_seat: {
        type: Sequelize.INTEGER
      },
      game_start: {
        type: Sequelize.DATE
      },
      drawn_card_id:{
        type: Sequelize.INTEGER,
        references: {
            model:'cards',
            key:'card_id' 
          }
      },
      turn_direction:{
        type: Sequelize.INTEGER
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('games');
  }
};
