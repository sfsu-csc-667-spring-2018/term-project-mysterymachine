var renderPlayers = function (players) {
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
 const game_id = $('#game_id').val();
 $.each(players, function (index, value) {
  console.log(value);
  if (value.score > 500) {
   $("#title").html('<h2> Game over! </h2>');
   // $("#start_game").prop('disabled', true);
   $("#submitArea").html(`
         <form id="done" method="POST" action="/game/${game_id}/done" >
           <button id="done_game" type="submit" style="width:auto;" class="btn btn-success">Done</button>
         </form>
         `);
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
 const game_status = $('#game_status').val();
 if (game_status == 'DONE') {
  $("#submitArea").html('');
 }
 if (players.length < 2) {
  $("#start_game").prop('disabled', true);
 } else {
  $("#start_game").removeAttr("disabled");
 }
}

function worker() {
 const game_id = $('#game_id').val();
 const game_status = $('#game_status').val();
 console.log(game_id);
 $.ajax({
  url: '/game/' + game_id + '/players',
  success: function (users) {
   console.log(users);
   renderPlayers(users);
  },
  complete: function () {
   // Schedule the next request when the current one's complete
   if (game_status == 'OPEN') {
    setTimeout(worker, 5000);
   }
  }
 });
}

$("document").ready(function () {
 setTimeout(worker, 100);
});
