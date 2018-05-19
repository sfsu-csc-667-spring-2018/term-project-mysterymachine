module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( 'hand_has_cards', [
      {hand_id: 1, card_id: 1},
      {hand_id: 1, card_id: 2},
      {hand_id: 1, card_id: 3},
      {hand_id: 1, card_id: 4},
      {hand_id: 1, card_id: 5},
      {hand_id: 1, card_id: 6},
      {hand_id: 1, card_id: 7},

      {hand_id: 2, card_id: 8},
      {hand_id: 2, card_id: 9},
      {hand_id: 2, card_id: 10},
      {hand_id: 2, card_id: 11},
      {hand_id: 2, card_id: 12},
      {hand_id: 2, card_id: 13},
      {hand_id: 2, card_id: 14},

      {hand_id: 3, card_id: 15},
      {hand_id: 3, card_id: 16},
      {hand_id: 3, card_id: 17},
      {hand_id: 3, card_id: 18},
      {hand_id: 3, card_id: 19},
      {hand_id: 3, card_id: 20},
      {hand_id: 3, card_id: 21},
    ], {});
  },
  down: (queryInterface, Sequelize) => {

  }
};