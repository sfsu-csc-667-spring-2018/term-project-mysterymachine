module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'games', [
      {game_status: "ACTIVE", turn_order: -1, active_seat: 1,game_start: new Date(), top_card_id:10}
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};
