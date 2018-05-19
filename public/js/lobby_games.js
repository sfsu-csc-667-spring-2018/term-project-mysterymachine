var renderGames = function(games) {
  let table = document.getElementById("games");
  table.innerHTML = '';
  $.each(games, function( index, value) {
    console.log(value);
    let row = table.insertRow(-1);
    let rowHtml = `
      <td class="td1">${index}</td>
      <td class="td2">${value.game_id}</td>
      <td class="td3">${value.screen_name}</td>
      <td class="td4">${value.cnt}/8</td>`;
    if (value.game_status === 'OPEN') {
      rowHtml += `
      <td class="td5">
        <img src="../img/green_dot.png" alt="Indicates game is open and possible to join" title="Indicates game is open and possible to join">
      </td>
      <td class="td6">
        <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST">
          <button id="join_game${index}" type="submit" class="dataSub btn btn-success">Click to join </button>
        </form>
      </td>`;
    } else {
      rowHtml += `
      <td class="td5">
        <img src="/img/red_dot.png" alt="Indicates game is closed and not possible to join" title="Indicates game is close and not possible to join">
      </td>`;
    }
    row.innerHTML = rowHtml;
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
