module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('cards', [
   {
    card_id: 0,
    description: 'question',
    face: '?',
    color: 'grey',
    value: 0,
    image_address: '/img/cards/question.jpg'
   },
   {
    card_id: 1,
    description: 'red 1',
    face: '1',
    color: 'red',
    value: 1,
    image_address: '/img/cards/red1.jpg'
   },
   {
    card_id: 2,
    description: 'red 2',
    face: '2',
    color: 'red',
    value: 2,
    image_address: '/img/cards/red2.jpg'
   },
   {
    card_id: 3,
    description: 'red 3',
    face: '3',
    color: 'red',
    value: 3,
    image_address: '/img/cards/red3.jpg'
   },
   {
    card_id: 4,
    description: 'red 4',
    face: '4',
    color: 'red',
    value: 4,
    image_address: '/img/cards/red4.jpg'
   },
   {
    card_id: 5,
    description: 'red 5',
    face: '5',
    color: 'red',
    value: 5,
    image_address: '/img/cards/red5.jpg'
   },
   {
    card_id: 6,
    description: 'red 6',
    face: '6',
    color: 'red',
    value: 6,
    image_address: '/img/cards/red6.jpg'
   },
   {
    card_id: 7,
    description: 'red 7',
    face: '7',
    color: 'red',
    value: 7,
    image_address: '/img/cards/red7.jpg'
   },
   {
    card_id: 8,
    description: 'red 8',
    face: '8',
    color: 'red',
    value: 8,
    image_address: '/img/cards/red8.jpg'
   },
   {
    card_id: 9,
    description: 'red 9',
    face: '9',
    color: 'red',
    value: 9,
    image_address: '/img/cards/red9.jpg'
   },
   {
    card_id: 10,
    description: 'red 0',
    face: '0',
    color: 'red',
    value: 0,
    image_address: '/img/cards/red0.jpg'
   },
   {
    card_id: 11,
    description: 'red 1',
    face: '1',
    color: 'red',
    value: 1,
    image_address: '/img/cards/red1.jpg'
   },
   {
    card_id: 12,
    description: 'red 2',
    face: '2',
    color: 'red',
    value: 2,
    image_address: '/img/cards/red2.jpg'
   },
   {
    card_id: 13,
    description: 'red 3',
    face: '3',
    color: 'red',
    value: 3,
    image_address: '/img/cards/red3.jpg'
   },
   {
    card_id: 14,
    description: 'red 4',
    face: '4',
    color: 'red',
    value: 4,
    image_address: '/img/cards/red4.jpg'
   },
   {
    card_id: 15,
    description: 'red 5',
    face: '5',
    color: 'red',
    value: 5,
    image_address: '/img/cards/red5.jpg'
   },
   {
    card_id: 16,
    description: 'red 6',
    face: '6',
    color: 'red',
    value: 6,
    image_address: '/img/cards/red6.jpg'
   },
   {
    card_id: 17,
    description: 'red 7',
    face: '7',
    color: 'red',
    value: 7,
    image_address: '/img/cards/red7.jpg'
   },
   {
    card_id: 18,
    description: 'red 8',
    face: '8',
    color: 'red',
    value: 8,
    image_address: '/img/cards/red8.jpg'
   },
   {
    card_id: 19,
    description: 'red 9',
    face: '9',
    color: 'red',
    value: 9,
    image_address: '/img/cards/red9.jpg'
   },
   {
    card_id: 20,
    description: 'red draw two',
    face: 'draw two',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_draw_two.jpg'
   },
   {
    card_id: 21,
    description: 'red draw two',
    face: 'draw two',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_draw_two.jpg'
   },
   {
    card_id: 22,
    description: 'red skip',
    face: 'skip',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_skip.jpg'
   },
   {
    card_id: 23,
    description: 'red skip',
    face: 'skip',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_skip.jpg'
   },
   {
    card_id: 24,
    description: 'red reverse',
    face: 'reverse',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_reverse.jpg'
   },
   {
    card_id: 25,
    description: 'red reverse',
    face: 'reverse',
    color: 'red',
    value: 20,
    image_address: '/img/cards/red_reverse.jpg'
   },
   {
    card_id: 26,
    description: 'green 1',
    face: '1',
    color: 'green',
    value: 1,
    image_address: '/img/cards/green1.jpg'
   },
   {
    card_id: 27,
    description: 'green 2',
    face: '2',
    color: 'green',
    value: 2,
    image_address: '/img/cards/green2.jpg'
   },
   {
    card_id: 28,
    description: 'green 3',
    face: '3',
    color: 'green',
    value: 3,
    image_address: '/img/cards/green3.jpg'
   },
   {
    card_id: 29,
    description: 'green 4',
    face: '4',
    color: 'green',
    value: 4,
    image_address: '/img/cards/green4.jpg'
   },
   {
    card_id: 30,
    description: 'green 5',
    face: '5',
    color: 'green',
    value: 5,
    image_address: '/img/cards/green5.jpg'
   },
   {
    card_id: 31,
    description: 'green 6',
    face: '6',
    color: 'green',
    value: 6,
    image_address: '/img/cards/green6.jpg'
   },
   {
    card_id: 32,
    description: 'green 7',
    face: '7',
    color: 'green',
    value: 7,
    image_address: '/img/cards/green7.jpg'
   },
   {
    card_id: 33,
    description: 'green 8',
    face: '8',
    color: 'green',
    value: 8,
    image_address: '/img/cards/green8.jpg'
   },
   {
    card_id: 34,
    description: 'green 9',
    face: '9',
    color: 'green',
    value: 9,
    image_address: '/img/cards/green9.jpg'
   },
   {
    card_id: 35,
    description: 'green 0',
    face: '0',
    color: 'green',
    value: 0,
    image_address: '/img/cards/green0.jpg'
   },
   {
    card_id: 36,
    description: 'green 1',
    face: '1',
    color: 'green',
    value: 1,
    image_address: '/img/cards/green1.jpg'
   },
   {
    card_id: 37,
    description: 'green 2',
    face: '2',
    color: 'green',
    value: 2,
    image_address: '/img/cards/green2.jpg'
   },
   {
    card_id: 38,
    description: 'green 3',
    face: '3',
    color: 'green',
    value: 3,
    image_address: '/img/cards/green3.jpg'
   },
   {
    card_id: 39,
    description: 'green 4',
    face: '4',
    color: 'green',
    value: 4,
    image_address: '/img/cards/green4.jpg'
   },
   {
    card_id: 40,
    description: 'green 5',
    face: '5',
    color: 'green',
    value: 5,
    image_address: '/img/cards/green5.jpg'
   },
   {
    card_id: 41,
    description: 'green 6',
    face: '6',
    color: 'green',
    value: 6,
    image_address: '/img/cards/green6.jpg'
   },
   {
    card_id: 42,
    description: 'green 7',
    face: '7',
    color: 'green',
    value: 7,
    image_address: '/img/cards/green7.jpg'
   },
   {
    card_id: 43,
    description: 'green 8',
    face: '8',
    color: 'green',
    value: 8,
    image_address: '/img/cards/green8.jpg'
   },
   {
    card_id: 44,
    description: 'green 9',
    face: '9',
    color: 'green',
    value: 9,
    image_address: '/img/cards/green9.jpg'
   },
   {
    card_id: 45,
    description: 'green draw two',
    face: 'draw two',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_draw_two.jpg'
   },
   {
    card_id: 46,
    description: 'green draw two',
    face: 'draw two',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_draw_two.jpg'
   },
   {
    card_id: 47,
    description: 'green skip',
    face: 'skip',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_skip.jpg'
   },
   {
    card_id: 48,
    description: 'green skip',
    face: 'skip',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_skip.jpg'
   },
   {
    card_id: 49,
    description: 'green reverse',
    face: 'reverse',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_reverse.jpg'
   },
   {
    card_id: 50,
    description: 'green reverse',
    face: 'reverse',
    color: 'green',
    value: 20,
    image_address: '/img/cards/green_reverse.jpg'
   },
   {
    card_id: 51,
    description: 'yellow 1',
    face: '1',
    color: 'yellow',
    value: 1,
    image_address: '/img/cards/yellow1.jpg'
   },
   {
    card_id: 52,
    description: 'yellow 2',
    face: '2',
    color: 'yellow',
    value: 2,
    image_address: '/img/cards/yellow2.jpg'
   },
   {
    card_id: 53,
    description: 'yellow 3',
    face: '3',
    color: 'yellow',
    value: 3,
    image_address: '/img/cards/yellow3.jpg'
   },
   {
    card_id: 54,
    description: 'yellow 4',
    face: '4',
    color: 'yellow',
    value: 4,
    image_address: '/img/cards/yellow4.jpg'
   },
   {
    card_id: 55,
    description: 'yellow 5',
    face: '5',
    color: 'yellow',
    value: 5,
    image_address: '/img/cards/yellow5.jpg'
   },
   {
    card_id: 56,
    description: 'yellow 6',
    face: '6',
    color: 'yellow',
    value: 6,
    image_address: '/img/cards/yellow6.jpg'
   },
   {
    card_id: 57,
    description: 'yellow 7',
    face: '7',
    color: 'yellow',
    value: 7,
    image_address: '/img/cards/yellow7.jpg'
   },
   {
    card_id: 58,
    description: 'yellow 8',
    face: '8',
    color: 'yellow',
    value: 8,
    image_address: '/img/cards/yellow8.jpg'
   },
   {
    card_id: 59,
    description: 'yellow 9',
    face: '9',
    color: 'yellow',
    value: 9,
    image_address: '/img/cards/yellow9.jpg'
   },
   {
    card_id: 60,
    description: 'yellow 0',
    face: '0',
    color: 'yellow',
    value: 0,
    image_address: '/img/cards/yellow0.jpg'
   },
   {
    card_id: 61,
    description: 'yellow 1',
    face: '1',
    color: 'yellow',
    value: 1,
    image_address: '/img/cards/yellow1.jpg'
   },
   {
    card_id: 62,
    description: 'yellow 2',
    face: '2',
    color: 'yellow',
    value: 2,
    image_address: '/img/cards/yellow2.jpg'
   },
   {
    card_id: 63,
    description: 'yellow 3',
    face: '3',
    color: 'yellow',
    value: 3,
    image_address: '/img/cards/yellow3.jpg'
   },
   {
    card_id: 64,
    description: 'yellow 4',
    face: '4',
    color: 'yellow',
    value: 4,
    image_address: '/img/cards/yellow4.jpg'
   },
   {
    card_id: 65,
    description: 'yellow 5',
    face: '5',
    color: 'yellow',
    value: 5,
    image_address: '/img/cards/yellow5.jpg'
   },
   {
    card_id: 66,
    description: 'yellow 6',
    face: '6',
    color: 'yellow',
    value: 6,
    image_address: '/img/cards/yellow6.jpg'
   },
   {
    card_id: 67,
    description: 'yellow 7',
    face: '7',
    color: 'yellow',
    value: 7,
    image_address: '/img/cards/yellow7.jpg'
   },
   {
    card_id: 68,
    description: 'yellow 8',
    face: '8',
    color: 'yellow',
    value: 8,
    image_address: '/img/cards/yellow8.jpg'
   },
   {
    card_id: 69,
    description: 'yellow 9',
    face: '9',
    color: 'yellow',
    value: 9,
    image_address: '/img/cards/yellow9.jpg'
   },
   {
    card_id: 70,
    description: 'yellow draw two',
    face: 'draw two',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_draw_two.jpg'
   },
   {
    card_id: 71,
    description: 'yellow draw two',
    face: 'draw two',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_draw_two.jpg'
   },
   {
    card_id: 72,
    description: 'yellow skip',
    face: 'skip',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_skip.jpg'
   },
   {
    card_id: 73,
    description: 'yellow skip',
    face: 'skip',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_skip.jpg'
   },
   {
    card_id: 74,
    description: 'yellow reverse',
    face: 'reverse',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_reverse.jpg'
   },
   {
    card_id: 75,
    description: 'yellow reverse',
    face: 'reverse',
    color: 'yellow',
    value: 20,
    image_address: '/img/cards/yellow_reverse.jpg'
   },
   {
    card_id: 76,
    description: 'blue 1',
    face: '1',
    color: 'blue',
    value: 1,
    image_address: '/img/cards/blue1.jpg'
   },
   {
    card_id: 77,
    description: 'blue 2',
    face: '2',
    color: 'blue',
    value: 2,
    image_address: '/img/cards/blue2.jpg'
   },
   {
    card_id: 78,
    description: 'blue 3',
    face: '3',
    color: 'blue',
    value: 3,
    image_address: '/img/cards/blue3.jpg'
   },
   {
    card_id: 79,
    description: 'blue 4',
    face: '4',
    color: 'blue',
    value: 4,
    image_address: '/img/cards/blue4.jpg'
   },
   {
    card_id: 80,
    description: 'blue 5',
    face: '5',
    color: 'blue',
    value: 5,
    image_address: '/img/cards/blue5.jpg'
   },
   {
    card_id: 81,
    description: 'blue 6',
    face: '6',
    color: 'blue',
    value: 6,
    image_address: '/img/cards/blue6.jpg'
   },
   {
    card_id: 82,
    description: 'blue 7',
    face: '7',
    color: 'blue',
    value: 7,
    image_address: '/img/cards/blue7.jpg'
   },
   {
    card_id: 83,
    description: 'blue 8',
    face: '8',
    color: 'blue',
    value: 8,
    image_address: '/img/cards/blue8.jpg'
   },
   {
    card_id: 84,
    description: 'blue 9',
    face: '9',
    color: 'blue',
    value: 9,
    image_address: '/img/cards/blue9.jpg'
   },
   {
    card_id: 85,
    description: 'blue 0',
    face: '0',
    color: 'blue',
    value: 0,
    image_address: '/img/cards/blue0.jpg'
   },
   {
    card_id: 86,
    description: 'blue 1',
    face: '1',
    color: 'blue',
    value: 1,
    image_address: '/img/cards/blue1.jpg'
   },
   {
    card_id: 87,
    description: 'blue 2',
    face: '2',
    color: 'blue',
    value: 2,
    image_address: '/img/cards/blue2.jpg'
   },
   {
    card_id: 88,
    description: 'blue 3',
    face: '3',
    color: 'blue',
    value: 3,
    image_address: '/img/cards/blue3.jpg'
   },
   {
    card_id: 89,
    description: 'blue 4',
    face: '4',
    color: 'blue',
    value: 4,
    image_address: '/img/cards/blue4.jpg'
   },
   {
    card_id: 90,
    description: 'blue 5',
    face: '5',
    color: 'blue',
    value: 5,
    image_address: '/img/cards/blue5.jpg'
   },
   {
    card_id: 91,
    description: 'blue 6',
    face: '6',
    color: 'blue',
    value: 6,
    image_address: '/img/cards/blue6.jpg'
   },
   {
    card_id: 92,
    description: 'blue 7',
    face: '7',
    color: 'blue',
    value: 7,
    image_address: '/img/cards/blue7.jpg'
   },
   {
    card_id: 93,
    description: 'blue 8',
    face: '8',
    color: 'blue',
    value: 8,
    image_address: '/img/cards/blue8.jpg'
   },
   {
    card_id: 94,
    description: 'blue 9',
    face: '9',
    color: 'blue',
    value: 9,
    image_address: '/img/cards/blue9.jpg'
   },
   {
    card_id: 95,
    description: 'blue draw two',
    face: 'draw two',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_draw_two.jpg'
   },
   {
    card_id: 96,
    description: 'blue draw two',
    face: 'draw two',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_draw_two.jpg'
   },
   {
    card_id: 97,
    description: 'blue skip',
    face: 'skip',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_skip.jpg'
   },
   {
    card_id: 98,
    description: 'blue skip',
    face: 'skip',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_skip.jpg'
   },
   {
    card_id: 99,
    description: 'blue reverse',
    face: 'reverse',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_reverse.jpg'
   },
   {
    card_id: 100,
    description: 'blue reverse',
    face: 'reverse',
    color: 'blue',
    value: 20,
    image_address: '/img/cards/blue_reverse.jpg'
   },
   {
    card_id: 101,
    description: 'wild',
    face: 'wild',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild.jpg'
   },
   {
    card_id: 102,
    description: 'wild',
    face: 'wild',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild.jpg'
   },
   {
    card_id: 103,
    description: 'wild',
    face: 'wild',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild.jpg'
   },
   {
    card_id: 104,
    description: 'wild',
    face: 'wild',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild.jpg'
   },
   {
    card_id: 105,
    description: 'wild draw four',
    face: 'wild draw four',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild_draw_four.jpg'
   },
   {
    card_id: 106,
    description: 'wild draw four',
    face: 'wild draw four',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild_draw_four.jpg'
   },
   {
    card_id: 107,
    description: 'wild draw four',
    face: 'wild draw four',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild_draw_four.jpg'
   },
   {
    card_id: 108,
    description: 'wild draw four',
    face: 'wild draw four',
    color: 'black',
    value: 50,
    image_address: '/img/cards/wild_draw_four.jpg'
   },

    ], {});
 },
 down: (queryInterface, Sequelize) => {

 }
};
