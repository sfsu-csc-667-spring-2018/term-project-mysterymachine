var renderPlayers = function(players) {
  let table = document.getElementById("game_wating");
  table.innerHTML = '';
  let headerRow = table.insertRow(-1);
  headerRow.innerHTML = `
        <th style="border:1px solid red">CURRENT PLAYERS</th>`;
  $.each(players, function( index, value) {
    console.log(value);
    let row = table.insertRow(-1);
    let rowHtml = `<th style="border:1px solid red">${value.screen_name}</th>`;
    row.innerHTML = rowHtml;
  });
}

function worker() {
  const game_id = $('#game_id').val();
  $.ajax({
    url: '/game/' + game_id + '/players',
    success: function(users) {
      console.log(users);
      renderPlayers(users);
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      // setTimeout(worker, 5000);
    }
  });
}

$("document").ready( function() {
  setTimeout(worker, 1000);
});
