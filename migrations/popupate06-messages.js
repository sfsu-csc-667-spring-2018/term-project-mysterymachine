module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('messages', [
   {
    user_id: 1,
    game_id: 1,
    text_message: "game 1 user 1 chat 1",
    time_sent: new Date()
   },
   {
    user_id: 1,
    game_id: 1,
    text_message: "game 1 user 1 chat 2",
    time_sent: new Date()
   },
   {
    user_id: 2,
    game_id: 1,
    text_message: "game 1 user 2 chat 3",
    time_sent: new Date()
   },
   {
    user_id: 3,
    game_id: 1,
    text_message: "game 1 user 3 chat 4",
    time_sent: new Date()
   },
   {
    user_id: 3,
    game_id: 1,
    text_message: "game 1 user 3 chat 5",
    time_sent: new Date()
   },
   {
    user_id: 4,
    game_id: 1,
    text_message: "game 1 user 4 chat 6",
    time_sent: new Date()
   },
   {
    user_id: 1,
    game_id: 1,
    text_message: "game 1 user 1 chat 7",
    time_sent: new Date()
   },
   {
    user_id: 5,
    game_id: 1,
    text_message: "game 1 user 5 chat 8",
    time_sent: new Date()
   },
   {
    user_id: 5,
    game_id: 1,
    text_message: "game 1 user 5 chat 9",
    time_sent: new Date()
   },
   {
    user_id: 1,
    game_id: 1,
    text_message: "game 1 user 1 chat 10",
    time_sent: new Date()
   },
    ], {});
 },
 down: (queryInterface, Sequelize) => {

 }
};
