'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('active_card', {
        card_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          references: {
            model:'cards',
            key:'card_id' 
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
     color: {
      type: Sequelize.TEXT
     }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('active_card');
  }
};
