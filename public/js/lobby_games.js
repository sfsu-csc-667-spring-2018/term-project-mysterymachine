var renderGames = function(games) {
  let table = document.getElementById("games");
  table.innerHTML = '';
  let rows = new Array(games.length);
  for (let i = 0; i < rows.length; i++) {
    rows[i] = table.insertRow(-1);
  }
  $.each(games, function( index, value) {
    console.log(value);

    $.get('/game/' + value.game_id + '/check_user/', function(in_game) {
      console.log(in_game);
      // let row = table.insertRow(-1);
      let rowHtml = `
        <td class="td1">${index}</td>
        <td class="td2">${value.game_id}</td>
        <td class="td3">${value.screen_name}</td>
        <td class="td4">${value.cnt}/7</td>`;
      const can_join = value.game_status === 'OPEN' && value.cnt < 7;
      if (can_join) {
        rowHtml += `
        <td class="td5">
          <img src="../img/green_dot.png" alt="Indicates game is open and possible to join" title="Indicates game is open and possible to join">
        </td>`;
      } else {
        rowHtml += `
        <td class="td5">
          <img src="/img/red_dot.png" alt="Indicates game is closed and not possible to join" title="Indicates game is close and not possible to join">
        </td>`;
      }
      if (in_game > 0) {
        rowHtml += `
        <td class="td6">
          <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST" target="_blank">
            <button id="join_game${index}" type="submit" class="dataSub btn btn-success">Click to re-join </button>
          </form>
        </td>`
      } else if (can_join) {
        rowHtml += `
        <td class="td6">
          <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST" target="_blank">
            <button id="join_game${index}" type="submit" class="dataSub btn btn-success">Click to join </button>
          </form>
        </td>`
      }
      rows[index].innerHTML = rowHtml;
      // row.innerHTML = rowHtml;
    });
  });
}

function worker() {
  $.ajax({
    url: '/lobby/games',
    success: function(games) {
      renderGames(games);
    },
    complete: function() {
      // Schedule the next request when the current one's complete
      // setTimeout(worker, 5000);
    }
  });
}

$("document").ready( function() {
  setTimeout(worker, 100);
});
