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
      }).then(function() {
        return queryInterface.sequelize.query(
          `ALTER TABLE game_has_hands ADD CONSTRAINT game_has_hands_unique1 UNIQUE(game_id, user_id)`
        );
      }).then(function() {
        return queryInterface.sequelize.query(
          `ALTER TABLE game_has_hands ADD CONSTRAINT game_has_hands_unique2 UNIQUE(game_id, seat_number)`
        );
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('game_has_hands');
    }
  };
