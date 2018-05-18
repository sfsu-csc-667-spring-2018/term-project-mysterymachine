module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'games', [
      {game_status: "joining", host_id: 1, active_seat: 1,game_start: new Date(), active_card_id:10},
      {game_status: "OPEN", host_id: 2},
      {game_status: "OPEN", host_id: 3},
      {game_status: "OPEN", host_id: 4},
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};
