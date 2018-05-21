var renderPlayers = function(players) {
  let table = document.getElementById("game_wating");
  table.innerHTML = '';
  let innerHTML = `
    <thead>
      <tr>
        <th class="th1">#</th>
        <th class="th2">Username</th>
        <th class="th3">Score</th>
      </tr>
    </thead>
   <tbody>`;

   $("#title").html('<h2> Waiting to start a new game </h2>')

   $.each(players, function( index, value) {
     console.log(value);
     if (value.score > 100) {
       $("#title").html('<h2> Game over! </h2>');
       $("#startGame").prop('disabled', true);
     }
     innerHTML += `
       <tr>
         <td class="td1">${value.seat_number}</td>
         <td class="td2">${value.screen_name}</td>
         <td class="td3">${value.score} </td>
       </tr>`;
   });
   innerHTML += `</tbody>`;
   table.innerHTML = innerHTML;
}

function worker() {
  const game_id = $('#game_id').val();
  console.log(game_id);
  $.ajax({
    url: '/game/' + game_id + '/players',
    success: function(users) {
      console.log(users);
      renderPlayers(users);
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      setTimeout(worker, 5000);
    }
  });
}

$("document").ready( function() {
  setTimeout(worker, 100);
});
