module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('game_has_hands', [
   {
    user_id: 1,
    game_id: 1,
    seat_number: 1,
    score: 0
   },
   {
    user_id: 2,
    game_id: 1,
    seat_number: 2,
    score: 0
   },
   {
    user_id: 3,
    game_id: 1,
    seat_number: 3,
    score: 0
   },
   {
    user_id: 4,
    game_id: 1,
    seat_number: 4,
    score: 0
   },
   {
    user_id: 5,
    game_id: 1,
    seat_number: 5,
    score: 0
   },
   {
    user_id: 6,
    game_id: 1,
    seat_number: 6,
    score: 0
   },
   {
    user_id: 7,
    game_id: 1,
    seat_number: 7,
    score: 0
   },
   {
    user_id: 1,
    game_id: 2,
    seat_number: 1,
    score: 0
   },
   {
    user_id: 2,
    game_id: 2,
    seat_number: 2,
    score: 0
   },
   {
    user_id: 3,
    game_id: 2,
    seat_number: 3,
    score: 0
   },
   {
    user_id: 4,
    game_id: 2,
    seat_number: 4,
    score: 0
   },
   {
    user_id: 5,
    game_id: 3,
    seat_number: 1,
    score: 0
   },
   {
    user_id: 6,
    game_id: 3,
    seat_number: 2,
    score: 0
   },
   {
    user_id: 7,
    game_id: 3,
    seat_number: 3,
    score: 0
   }
    ], {});
 },
 down: (queryInterface, Sequelize) => {

 }
};
