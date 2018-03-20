'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('game_has_hands', {
        hand_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'users',
            key:'user_id' 
          }
        },
        game_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model:'games',
            key:'game_id' 
          }
        },
        seat_number: {
          type: Sequelize.INTEGER
        }  
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('game_has_hands');
    }
  };