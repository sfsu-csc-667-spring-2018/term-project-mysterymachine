module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'games', [
      {game_status: "joining", host_id: 1, active_seat: 1,game_start: new Date()},
      {game_status: "joining", host_id: 2},
      {game_status: "joining", host_id: 3},
      {game_status: "joining", host_id: 4},
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};
