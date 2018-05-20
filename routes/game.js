const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const io = require('../socket');

const Games = require('../db/games');

// host/game/1
router.get('/:game_id', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game', { table:"true", title: 'Playing', game_id: req.params.game_id, user_id:req.user.user_id});
});

// host/game/1/details
router.get('/:game_id/details', requireAuth, function(req, res, next) {
  const user_id = req.user.user_id;
  Games.get(req.params.game_id).then (game => {
    // console.log(game);
    Games.get_users(req.params.game_id).then (users => {
      // console.log(users);
      Games.get_user_cards(req.params.game_id, user_id).then ( cards => {
        res.status(200).json({active_seat : game.active_seat, turn_order: game.turn_order,
          has_drawn: game.has_drawn, face: game.face, color: game.color, image_address: game.image_address,
          users: users, cards: cards});
      }).catch( error => console.log("Error in get_user_cards: ",error));
    }).catch( error => console.log("Error in get_users: ",error));
  }).catch( error=> console.log("Error in Games.get: ",error));
  // res.render('game_table', { title: 'Playing', game_id: req.params.id});
});

// host/game/1/player/1/cards
// get cards of a player in a game
// router.get('/:game_id/player/:player_id/cards', requireAuth, function(req, res, next) {
//   console.log(req.params);
//   Games.get_user_cards(req.params.game_id, req.params.player_id).then ( cards => {
//     res.status(200).json(cards);
//   }).catch( error=> console.log("ERROR: ", error));;
// });

// Check if user is in a game
router.get('/:game_id/check_user', requireAuth, function(req, res, next) {
  console.log(req.params);
  Games.check_game_user(req.params.game_id, req.user.user_id).then (result => {
    res.status(200).json(1);
  }).catch (error => {
    res.status(200).json(-1);
  });
});

// user to join an existing game
router.post('/:game_id/join', requireAuth, function(req, res, next) {
  console.log(req.params);
  // console.log(req.user);
  Games.check_game_user(req.params.game_id, req.user.user_id).then (result => {
    console.log("Already in game");
    Games.get_game_status_count(req.params.game_id).then(result => {
      if (result.game_status === 'OPEN') {
        // redirect to waiting room if game is open
        res.redirect('/room/' + req.params.game_id);
      } else {
        // redirect to playing game if not
        res.redirect('/game/' + req.params.game_id);
      }
    }).catch(error => {
      console.log("Error get game status", error);
      res.redirect('/lobby');
    });
  }).catch (error => {
    // console.log(error);
    Games.get_game_status_count(req.params.game_id).then(result => {
      console.log("GET GAME STATUS");
      console.log(result);
      if (result.game_status === 'OPEN' && result.cnt < 8) {
        Games.join_game(req.params.game_id, req.user.user_id, ++result.cnt).then(insert => {
          console.log("successfully joined the game");
          // res.redirect('/lobby');
          res.redirect('/room/' + req.params.game_id);
        }).catch(error => {
          console.log("Error joining the game: ");
          console.log(error);
          res.redirect('/lobby');
        });
      } else {
        res.redirect('/lobby');
      }
    }).catch(error => {
      console.log("Error get game status", error);
      res.redirect('/lobby');
    });
  })
});

// Get players of a game
router.get('/:game_id/players', requireAuth, function(req, res, next) {
  Games.get_users(req.params.game_id).then (users => {
    console.log(users);
    res.status(200).json(users);
  }).catch( error => console.log("Error in get_users: ", error));
});

// Create a new game for the current user
router.post('/create', requireAuth, function(req, res, next) {
  Games.new_game(req.user.user_id).then(game => {
    Games.join_game(game.game_id, req.user.user_id, 1).then(join_game => {
      console.log("successfully created the game");
      console.log(game);
      res.redirect('/room/' + game.game_id);
    }).catch( error => {
      res.redirect('/lobby');
      console.log("Error in join_game: ", error)
    });
  }).catch( error => {
    res.redirect('/lobby');
    console.log("Error in new_game: ", error);
  });
});

// Host to start a new game:
// draw random cards to players, remaining cards to active_pile
// Update game state, start time, turn_order, active_seat
router.post('/:id/start', function(req, res, next) {
  const game_id = req.params.id;
  console.log("START GAME" + game_id);
  Games.get_hands_for_game(game_id).then(hand_ids => {
    console.log(hand_ids);
    Games.start_game(game_id, hand_ids).then(result => {
      res.redirect('/game/' + game_id);
    }).catch( error => {
      console.log("Error in start_game: ", error);
      res.redirect('/lobby');
    });
  }).catch( error => {
    console.log("Error in get_hands_for_game: ", error);
    res.redirect('/lobby');
  });
});

// host/game/1/draw/
// player choses to draw a card
router.post('/:game_id/draw/',requireAuth,function(req,res,next){
  const user_id = req.user.user_id;
  const game_id = req.params.game_id;
  Games.check_drawable(game_id, user_id).then(data => {
    Games.get_card_active_pile(game_id).then(card => {
      Games.draw_card(game_id, user_id, card.card_id).then(result => {
        res.status(200).json(1);
      }).catch( error => {
        console.log("Error in draw_card: ", error);
        res.status(500);
      });
    }).catch( error => {
      console.log("Error in get_card_active_pile: ", error);
      res.status(500);
    });
  }).catch( error => {
    console.log("User does not have permission to draw card: ", error);
    res.status(500);
  });
});

// player choses to skip their turn after keep drawn card
router.post('/:game_id/skip_turn/',requireAuth,function(req,res,next){
  const user_id = req.user.user_id;
  const game_id = req.params.game_id;

  Games.check_skipable(game_id, user_id).then(data => {
    console.log(data[0]);
    console.log(data[1]);
    const current_seat = parseInt(data[0].active_seat);
    const turn_order = parseInt(data[0].turn_order);
    const user_cnt = parseInt(data[1].cnt);
    const next_seat = current_seat % user_cnt + turn_order;
    console.log("NEXT " + next_seat);
    Games.skip_turn(game_id, next_seat).then(result => {
      res.status(200).json(1);
    }).catch( error => {
      console.log("Error in skip_turn: ", error);
      res.status(500);
    });;
  }).catch( error => {
    console.log("User does not have permission to skip their turn: ", error);
    res.status(500);
  });
});

// host/game/1/play/12
// player plays a card
router.post(':game_id/play/:card_id',requireAuth, function(req,res,next){
  // check for correct user/turn
  // check for correct game_status
  // check for playable card
  // check for card_id in hand
  // change game status to busy (playing)

  // remove card id from player
  // play card function( card_id )
    // add card_id to discard/active
    // if single card remains in hand and no Uno call, force draw 2
    // apply card effects to game
      // update game_id active_color
      // if numbered
        // pass turn
        // change game status to 'waiting for play'
      // if skip
        // pass turn twice
        // change game status to 'waiting for play'
      // if reverse
        // reverse turn order (1,-1)
        // pass turn
        // change game status to 'waiting for play'
      // if draw 2
        // then pass turn
        // force draw 2
        // change game status to 'waiting for play'
      // if wild or wild 4
        // change game status to 'waiting for color decision'
        // emit color decision
    // end function

  // check for win condition
  // emit new game_state
});


// host/game/1/playDrawn/
// player choses to play drawn card
router.post('/:game_id/playDrawn/',requireAuth,function(req,res,next){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // get card_id from game_state
  // play card function(card_id)
    // add card_id to discard/active
    // if single card remains in hand and no Uno call, force draw 2
    // apply card effects to game
      // update game_id active_color
      // if numbered
        // pass turn
        // change game_status to 'waiting for play'
      // if skip
        // pass turn twice
        // change game_status to 'waiting for play'
      // if reverse
        // reverse turn order (1,-1)
        // pass turn
        // change game_status to 'waiting for play'
      // if draw 2
        // then pass turn
        // force draw 2
        // change game_status to 'waiting for play'
      // if wild or wild 4
        // change game_status to 'waiting for color decision'
        // emit color decision
    // end function

    // emit game_state
});

// host.game/1/color
// player choses a color for their wild card
router.post('/:game_id/color/:color',requireAuth,function(req,res,next){
  // check for correct user/turn
  // check for correct game status
  // change game status to busy(playing)

  // change color
  // pass turn
  // if discard/active is 'wild 4'
    // force draw 4
  // pass turn (skip)
  // change game status to 'waiting for play'
  // emit game_state
});

router.post('/game_id/chat',requireAuth, (req, res, next) => {
    let {message} = request.body;
    let game_id = request.params.game_id;
    let screen_name = request.user.screen_name;

    console.log('game route chat: ' + message);

    request.app.io.of('/game/${game_id}').emit('message', {
        game_id,
        message,
        screen_name
    });
    response.sendStatus(200);
});

module.exports = router;
