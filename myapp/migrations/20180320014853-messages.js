'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('messages', {
        user_id: {
          allowNull: false,
          primaryKey: true,
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
        text_message: {
          type: Sequelize.TEXT
        },
        time_sent: {
          type: Sequelize.DATE
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('messages');
    }
  };
  
