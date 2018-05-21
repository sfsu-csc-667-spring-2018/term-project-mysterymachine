const express = require('express');
const router = express.Router();
const requireAuth = require('../auth/requireAuth');
const io = require('../socket');

const Games = require('../db/games');

// host/game/1
router.get('/:game_id', requireAuth, function(req, res, next) {
  console.log(req.user);
  res.render('game', { table:"true", title: 'Playing', game_id: req.params.game_id});
});

// host/game/1/details
router.get('/:game_id/details', requireAuth, function(req, res, next) {
  console.log("get all users");
  Games.get(req.params.game_id).then (game => {
    console.log(game);
    Games.get_users(req.params.game_id).then (users => {
      console.log(users);
      res.status(200).json({game_status : game.status, current_player: game.current_player,
      users: users});
    }).catch( error => console.log("Error in get_user_cards: ",error));
  }).catch( error=> console.log("ERROR: ",error));
  // res.render('game_table', { title: 'Playing', game_id: req.params.id});
});

// host/game/1/player/1/cards
router.get('/:game_id/player/:player_id/cards', requireAuth, function(req, res, next) {
  console.log(req.params);
  Games.get_user_cards(req.params.game_id, req.params.user_id).then ( cards => {
    res.status(200).json(cards);
  });
});

router.post('/:game_id/join', requireAuth, function(req, res, next) {
  console.log(req.params);
  // console.log(req.user);
  Games.check_game_user(req.params.game_id, req.user.user_id).then (result => {
    console.log("Already in game");
    res.redirect('/room/' + req.params.game_id);
  }).catch (error => {
    // console.log(error);
    Games.get_game_status_count(req.params.game_id).then(result => {
      console.log("GET GAME STATUS");
      console.log(result);
      if (result.game_status === 'OPEN') {
        Games.join_game(req.params.game_id, req.user.user_id, ++result.cnt).then(insert => {
          console.log("successfully joined the game");
          // res.redirect('/lobby');
          res.redirect('/room/' + req.params.game_id);
        }).catch(error => {
          console.log("Error joining the game: ");
          console.log(error);
          res.redirect('/lobby');
        });
      }
    }).catch(error => {
      console.log("Error get game status");
      console.log(error);
      res.redirect('/lobby');
    });
  })
});

router.get('/:game_id/players', requireAuth, function(req, res, next) {
  Games.get_users(req.params.game_id).then (users => {
    console.log(users);
    res.status(200).json(users);
  }).catch( error => console.log("Error in get_users: ", error));
});

router.post('/create', requireAuth, function(req, res, next) {
  Games.new_game(req.user.user_id).then(game => {
      console.log("successfully created the game");
      //console.log(game);
      res.redirect('/room/' + game.game_id);
    }).catch( error => {
      res.redirect('/lobby');
      console.log("Error in join_game: ", error)
    });
});

// host/game/1/play/12
// player plays a card
router.post(':game_id/play/:card_id',requireAuth, function(req,res,next){
  var game_id = req.params.game_id;
  var screen_name = req.user.screen_name;
  var card_id = req.params.card_id;

  console.log("Player "+screen_name+" in game "+game_id+" is playing "+card_id);
  
  var p_check_state = Games.get_game_state(game_id); // check for correct game_status
  var p_check_player = Games.get_current_player(game_id); // check for correct player
  var p_check_card = Games.get_user_cards(game_id,screen_name); // check for card in hand
  var p_check_playable = Games.check_playable(game_id,card_id); // check if card is playable

  Promise.all([p_check_state,p_check_player,p_check_card,p_check_playable]).then( ()=>{ // promise all checks
    if( p_check_state == 'waiting' 
        && p_check_player == screen_name
        && p_check_card.contains(card_id)
        && p_check_playable){
       // checks successful!
      Games.set_status(game_id,"locked").then( ()=>{ // change state to locked
        var p_remove = Games.discard_card(game_id,screen_name,card_id); // remove card id from player
        var p_card_count = Games.get_user_cards(game_id,screen_name); // for uno check
        var p_play_card = Games.play_card(game_id,card_id); // play card function( card_id )

        Promise.all([p_remove, p_card_count, p_play_card]).then(()=>{ // wait for all card functions
          if( p_card_count == 1 && !req.body.uno){ // if they needed to call uno and didnt
            Games.draw_card(game_id,2,screen_name); // draw two
          }
          console.log("successful play"); 
          Games.check_win(game_id).then( win=>{ // check for win
            if( win ){
              // win
              Games.set_status(game_id,'complete'); // set status to finished
              // emit update
              // io.to('/game/'+game_id).emit('win',data);
            }else{
              // continue
              Games.set_status(game_id,p_play_card); // set game status from return status value
              // emit update (maybe seperate function)
              // io.to('/game/'+game_id).emit('update', data);
            }
          });// end check win
        });// end promis all card actions
    });// end set status 'joining'

    }// end if everything checks out
    else{
      // failed checks
      console.log("bad request from "+user_id+" in game "+game_id);
      // io.to('/game/'+game_id+'/'+screen_name).emit('error',data);
    }
  }).catch(error=>console.log('error: '+error));// end promise all checks
});// end play card


// host/game/1/draw/
// player choses to draw a card
router.post('/:game_id/draw/',requireAuth,function(req,res,next){
  var game_id = req.params.game_id;
  var screen_name = req.user.screen_name;

  var p_check_user = Games.get_current_player(game_id);// check for correct user/turn
  var p_check_status = Games.get_game_status(game_id);// check for correct game status

  Promise.all([p_check_user,p_check_status]).then( ()=>{ // all pre check promises
    if(p_check_user == screen_name
       && p_check_status == 'waiting'){

      Games.set_game_status(game_id,'locked').then(()=>{// change game status to busyd
        Games.draw_card(game_id).then( card_id =>{ // draw from deck
          Games.check_playable(game_id,card_id).then( playable=>{ // check if playable boolean (???)
            if(playable){
              var p_card = Games.save_card(game_id,card_id);// save card_id in game_id
              var p_status =Games.set_game_status(game_id,'drawDecision');// change game status to 'waiting for draw decision'
              Promise.all([p_card,p_status]).then(()=>{ // promise all actions
                // emit update
                // emit cards to players
                // io.to('/game/'+game_id).emit('update',data);
            }).catch(error=>console.log('Error: '+error));

            }else { // not playable
              var p_card = Games.card_to_hand(game_id,screen_name,card_id);// add to player hand
              var p_player = Games.next_player(game_id); // next player
              var p_status = Games.set_game_status(game_id,'waiting');// change game status to 'waiting for play'
              Promise.all([p_card,p_player,p_status]).then(()=>{ // promise all actions
                // emit update
                // emit cards to players
                // io.to('/game/'+game_id).emit('update',data);
            }).catch(error=>console.log('Error: '+error));
            }// end if else
          })// end playable check promise
        })// end draw card
      })// end status check
  }else{ // checks didnt pass
    // emit error
    // io.to('/game/'+game_id).emit('error',data);
    console.log("bad request from "+user_id+" in game "+game_id);
  }
  })// end promise all checks
  .catch(error=>console.log('Error: '+error));
});// end post

// host/game/1/playDrawn/
// player choses to play drawn card
router.post('/:game_id/playDrawn/',requireAuth,function(req,res,next){
  var game_id = req.params.game_id;
  var screen_name = req.user.screen_name;

  var p_check_user = Games.get_current_player(game_id);// check for correct user/turn
  var p_check_status = Games.get_game_status(game_id);// check for correct game status

  Promise.all([p_check_user,p_check_status]).then( ()=>{ // all pre check promises
    if(p_check_user == screen_name
      && p_check_status == 'drawDecision'){
      Games.set_game_status(game_id,'locked').then(()=>{// change game status to busy
        Games.get_saved_card(game_id).then(card_id=>{// get card_id from game_state
          Games.play_card(game_id,card_id).then(game_state=>{ // play card function(card_id)
            Games.set_game_status(game_id,game_state);
            // emit update
            // io.to('/game/'+game_id).emit('update',data);
            // emit cards to players
          }).catch(error=>console.log('Error: '+error));
        }).catch(error=>console.log('Error: '+error));
      }).catch(error=>console.log('Error: '+error));
    }else{ // checks didnt pass
    // emit error
    // io.to('/game/'+game_id).emit('error',data);
    console.log("bad request from "+user_id+" in game "+game_id);
  }
  })// end promise all checks
  .catch(error=>console.log('Error: '+error));
});// end post


// host/game/1/keep
// player choses to keep drawn card
router.post('/:game_id/keep/',requireAuth,function(req,res,next){
  var game_id = req.params.game_id;
  var screen_name = req.user.screen_name;

  var p_check_user = Games.get_current_player(game_id);// check for correct user/turn
  var p_check_status = Games.get_game_status(game_id);// check for correct game status

  Promise.all([p_check_user,p_check_status]).then( ()=>{ // all pre check promises
    if(p_check_user == screen_name
      && p_check_status == 'drawDecision'){
      Games.set_game_status(game_id,'locked').then(()=>{// change game status to busy
        Games.get_saved_card(game_id).then(card_id=>{// get card_id from game_state

          var p_card = Games.card_to_hand(game_id,screen_name,card_id) // move card to hand
            .catch(error=>console.log('Error: '+error));
          var p_next = Games.next_player(game_id) // pass player turn
            .catch(error=>console.log('Error: '+error));

          Promise.all([p_card,p_next]).then(()=>{
            Games.set_game_status(game_state,'waiting') // set game code
              .catch(error=>console.log('Error: '+error));

              // emit update
            // io.to('/game/'+game_id).emit('update',data);
            // emit cards to players
          })// end all promises
            
        }).catch(error=>console.log('Error: '+error)); // end get draw_card
      }).catch(error=>console.log('Error: '+error)); // end get status
    }else{ // checks didnt pass
    // emit error
    // io.to('/game/'+game_id).emit('error',data);
    console.log("bad request from "+user_id+" in game "+game_id);
  }
  })// end promise all checks
  .catch(error=>console.log('Error: '+error));
});

// host.game/1/color
// player choses a color for their wild card
router.post('/:game_id/color/:colorVal',requireAuth,function(req,res,next){
  var game_id = req.params.game_id;
  var screen_name = req.user.screen_name;
  var colorVal = req.params.colorVal;

  var p_check_user = Games.get_current_player(game_id);// check for correct user/turn
  var p_check_status = Games.get_game_status(game_id);// check for correct game status

  Promise.all([p_check_user,p_check_status]).then( ()=>{ // all pre check promises
    if(p_check_user == screen_name
      && p_check_status == 'colorDecision'){
      Games.set_game_status(game_id,'locked').then(()=>{// change game status to busy
        Games.set_color(game_id,colorVal).then(()=>{// set color value
          Games.get_saved_card(game_id).then((card_id)=>{// get drawn_card, which is a wild or wild 4
            if(card_id.face == 'wild'){
              Games.next_player(game_id).then(()=>// skip this player
                Games.next_player(game_id).then(()=>{ // next player
                  Games.set_game_status(game_id,'waiting') //change game status
                  .catch(error=>console.log('Error: '+error)) // end game status change
                  // emit update
                  // io.to('/game/'+game_id).emit('update',data);
                  // emit cards to players
                  }).catch(error=>console.log('Error: '+error))) // end skip
              .catch(error=>console.log('Error: '+error)); // end turn
            }else{ // wild draw 4
              Games.next_player(game_id).then(()=>// skip this player
                Games.draw_card(game_id,4,screen_name).then(()=>
                  Games.next_player(game_id).then(()=>{ // next player
                    Games.set_game_status(game_id,'waiting') //change game status
                      .catch(error=>console.log('Error: '+error)); // end game status change
                  // emit update
                  // io.to('/game/'+game_id).emit('update',data);
                  // emit cards to players
                    }).catch(error=>console.log('Error: '+error)) // end next
                  ).catch(error=>console.log('Error: '+error)) // end draw
                ).catch(error=>console.log('Error: '+error)) // end skip
            }// end else
          }).catch(error=>console.log('Error: '+error));// end get saved card

            // emit update
            // io.to('/game/'+game_id).emit('update',data);
            // emit cards to players
          
        }).catch(error=>console.log('Error: '+error));// end set color
      }).catch(error=>console.log('Error: '+error)); // end set status
    }else{ // checks didnt pass
    // emit error
    // io.to('/game/'+game_id).emit('error',data);
    console.log("bad request from "+user_id+" in game "+game_id);
  }
  })// end promise all checks
  .catch(error=>console.log('Error: '+error));
});

router.post('/:game_id/chat',requireAuth, (req, res, next) => {
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

router.post('/:game_id/start',requireAuth,(req,res,next)=>{})
 /* // check for user in game
  Games.check_game_user(req.params.game_id, req.user.user_id).then (result => {
    Games.get_game_state(req.params.game_id).then( (game_state) =>{
      // check for valid game and user
      if( game_state.game_status != 'joining' || game_state.host_id != req.user.user_id)
        {res.sendStatus(400)}
      else{ 
        Promise.all(
          Games.get_users(req.params.game_id).then( (userList)=>{
          // for each user in game_id
          userList.forEach( (user)=>{
            
          })}));
            // draw 7 cards for user


        // active_seat = host
        // active_card = draw card
        // turn direction = 1
        // if wild, redraw
            // set active_color
        // else if reverse
            // turn direction = -1
        // else if skip
            // next turn
        // else if draw 2
            // force draw 2
            // skip

      }
    })
  }).catch (error => {
    // user not in game
    res.redirect('/lobby');
  }
})*/

module.exports = router;
