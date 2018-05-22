const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const io = require('../socket');

const Games = require('../db/games');

// host/game/1
router.get('/:game_id/', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game', { table:"true", title: 'Playing', game_id: req.params.game_id, user_id:req.user.user_id});
});

// host/game/1/details
router.get('/:game_id/details', requireAuth, function(req, res, next) {
  const user_id = req.user.user_id;
Games.get_player(req.params.game_id, user_id).then (player => { 
  Games.get(req.params.game_id).then (game => {
    Games.get_users(req.params.game_id,user_id).then (users => {
      Games.get_user_cards(req.params.game_id, user_id).then ( cards => {
        res.status(200).json({active_seat : game.active_seat, turn_order: game.turn_order,
          skipped: game.skipped, has_drawn: game.has_drawn, face: game.face, color: game.top_card_color,
          image_address: game.image_address, users: users, cards: cards, player: player});
      }).catch( error => {
        console.log("Error in get_user_cards: ",error);
        res.status(500).json();
      });
    }).catch( error => {
      console.log("Error in get_users: ",error);
      res.status(500).json();
    });
  }).catch( error=> {
    console.log("Error in Games.get: ",error);
    res.status(500).json();
  });
}).catch( error=> {
    console.log("Error in Games.get: ",error);
    res.status(500).json();
  });
});

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
      res.redirect('/room/' + req.params.game_id);
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
          res.redirect('/room/' + req.params.game_id);
        }).catch(error => {
          console.log("Error joining the game: ", error);
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
router.get('/:game_id/players/', requireAuth, function(req, res, next) {
  Games.get_users(req.params.game_id).then (users => {
    // console.log(users);
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
router.post('/:id/start/', function(req, res, next) {
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

// Update game state, start time, turn_order, active_seat
router.post('/:id/done/', function(req, res, next) {
  const game_id = req.params.id;
  Games.done_game(game_id).then(result => {
    res.redirect('/room/' + game_id);
  }).catch( error => {
    console.log("Error in done_game: ", error);
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
        res.status(500).json();
      });
    }).catch( error => {
      console.log("Error in get_card_active_pile: ", error);
      res.status(500).json();
    });
  }).catch( error => {
    console.log("User does not have permission to draw card: ", error);
    res.status(500).json();
  });
});

// player choses to skip their turn after keep drawn card
router.post('/:game_id/skip_turn/',requireAuth,function(req,res,next){
  const user_id = req.user.user_id;
  const game_id = req.params.game_id;

  Games.check_skipable(game_id, user_id).then(data => {
    const active_seat = parseInt(data[0].active_seat);
    const turn_order = parseInt(data[0].turn_order);
    const total_players = parseInt(data[1].cnt);
    const skipped = data[0].skipped;
    const next_seat = next_active_seat(active_seat, turn_order, total_players);
    const top_face = data[2].face;
    let draws = 0;
    console.log(skipped);
    if (skipped) {
      if (top_face == 'draw two') {
        draws = 2;
      } else if (top_face == 'wild draw four') {
        draws = 4;
      }
    }
    console.log("NEXT " + next_seat);
    Games.skip_turn(game_id, user_id, next_seat, draws).then(result => {
      res.status(200).json(1);
    }).catch( error => {
      console.log("Error in skip_turn: ", error);
      res.status(500).json();
    });
  }).catch( error => {
    console.log("User does not have permission to skip their turn: ", error);
    res.status(500).json();
  });
});

const next_active_seat = function(current_seat, move, user_cnt) {
  let next_seat = current_seat + move;
  if (next_seat > user_cnt) {
    next_seat = next_seat - user_cnt;
  }
  if (next_seat <= 0) {
    next_seat = next_seat + user_cnt;
  }
  return next_seat;
}

// host/game/1/play/12
// player plays a card
router.post('/:game_id/play/',requireAuth, function(req,res,next){
  console.log(req.body);
  playCard(req, res, false);
});

router.post('/:game_id/play_uno/',requireAuth, function(req,res,next) {
  console.log(req.body);
  const user_id = req.user.user_id;
  const game_id = req.params.game_id;
  Games.mark_uno(req.params.game_id, req.user.user_id).then(result => {
    playCard(req, res, true);
  }).catch(error => {
    console.log("Cannot do mark_uno for game: " + game_id + " and user: " + user_id, error);
    res.status(200).json(4);
  });
});

const playCard = function(req, res, user_uno_play) {
  const user_id = req.user.user_id;
  const game_id = req.params.game_id;
  const player_card_id = req.body.card_id;
  const chosen_color = req.body.color;
  Games.check_playable(game_id, user_id, player_card_id).then(data => {
    let turn_order = parseInt(data[0].turn_order);
    const active_seat = parseInt(data[0].active_seat);
    const top_card_id = parseInt(data[1].top_card_id);
    const top_color = data[1].color == "black" ? data[0].top_card_color : data[1].color;
    const top_face = data[1].face;
    let player_color = data[2].color;
    const player_face = data[2].face;
    const total_players = parseInt(data[3].cnt);
    const db_uno_play = data[4].uno_play;
    const card_cnt = data[4].card_cnt;

    if (player_color == 'black') {
      if (chosen_color != null) {
        player_color = chosen_color;
      } else {
        res.status(200).json(2);
        return;
      }
    }

    let draws = !db_uno_play && card_cnt == 1 ? 2 : 0;

    let move = turn_order;
    if (player_face == 'skip') {
      move = turn_order * 2;
    } else if (player_face == 'reverse') {
      turn_order = -turn_order;
      move = turn_order;
    }

    let skipped = 'f';
    if (player_face == 'draw two' ||
      player_face == 'draw two' ||
      player_face == 'wild draw four') {
        skipped = 't';
    }
    if (player_face.includes('wild') || top_color == player_color || top_face == player_face) {
      if (card_cnt == 1 && draws == 0) {
        Games.finish_game(game_id, user_id).then(result => {
          res.status(200).json(3);
        }).catch(error => {
          console.log("Error in finish_game", error);
          res.status(500).json();
        });
        return;
      }

      const next_seat = next_active_seat(active_seat, move, total_players);
      Games.next_player(game_id, user_id, next_seat, turn_order, player_card_id,
        top_card_id, skipped, chosen_color, draws, user_uno_play)
        .then(result => {
          res.status(200).json(0);
        }).catch( error => {
          console.log("Error in next_player: ", error);
          res.status(500).json();
        });
    } else {
      res.status(200).json(1);
    }
  }).catch( error => {
    console.log("Error in check_playable: ", error);
    res.status(500).json();
  });
}
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
