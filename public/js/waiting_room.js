var renderPlayers = function(players) {
  let table = document.getElementById("game_wating");
  table.innerHTML = '';
  let innerHTML = `
    <thead>
      <tr>
        <th class="th1">#</th>
        <th class="th2">Username</th>
        <th class="th3">Status</th>
      </tr>
    </thead>
   <tbody>`;

   $.each(players, function( index, value) {
     console.log(value);
     innerHTML += `
       <tr>
         <td class="td1">${value.seat_number}</td>
         <td class="td2">${value.screen_name}</td>
         <td class="td3"><img src="/img/green_dot.png" alt="Indicates player is ready" title="Indicates player is ready"> </td>
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
