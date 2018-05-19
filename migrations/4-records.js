 'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('records', {
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
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model:'games',
            key:'game_id' 
          }
        },
        score: {
          type: Sequelize.INTEGER
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('records');
    }
  };