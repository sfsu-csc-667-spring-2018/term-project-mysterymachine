module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'games', [
      {game_status: "ACTIVE", turn_order: 4, game_start: new Date(), top_card_id:10}
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};
