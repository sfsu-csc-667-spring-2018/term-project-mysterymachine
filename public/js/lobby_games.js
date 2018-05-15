var renderGames = function(games) {
  ;
  let table = document.getElementById("games");
  table.innerHTML = '';
  let headerRow = table.insertRow(-1);
  headerRow.innerHTML = `
        <th style="border:1px solid red">GAME NUMBER</th>
        <th style="border:1px solid red">HOST</th>
        <th style="border:1px solid red">NO PLAYERS</th>
        <th style="border:1px solid red">STATUS</th>`;
  $.each(games, function( index, value) {
    console.log(value);
    let row = table.insertRow(-1);
    let rowHtml = `<th style="border:1px solid red">GAME ${value.game_id}</th>
    <th style="border:1px solid red">${value.screen_name}</th>
    <th style="border:1px solid red">${value.cnt}</th>`;

    if (value.game_status === 'OPEN') {
      rowHtml += `
      <th style="border:1px solid red">
        <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST">
          <input name="game_id" type="hidden" value="${value.game_id}"/>
          <button id="join_game${index}" type="submit" class="dataSub btn btn-success">${value.game_status} </button>
          </form>
      </th>
      `
    } else {
      rowHtml += `<th style="border:1px solid red">${value.game_status}</th>`
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
      setTimeout(worker, 5000);
    }
  });
}

$("document").ready( function() {
  setTimeout(worker, 1000);
});
