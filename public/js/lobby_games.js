var renderGames = function(games) {
  let table = document.getElementById("games");
  table.innerHTML = '';
  // let headerRow = table.insertRow(-1);
  // headerRow.innerHTML = `
  //       <th style="border:1px solid red">GAME NUMBER</th>
  //       <th style="border:1px solid red">HOST</th>
  //       <th style="border:1px solid red">NO PLAYERS</th>
  //       <th style="border:1px solid red">STATUS</th>`;
  $.each(games, function( index, value) {
    console.log(value);
    let row = table.insertRow(-1);
    let rowHtml = `
      <td class="td1">${index}</td>
      <td class="td2">${value.game_id}</td>
      <td class="td3">${value.screen_name}</td>
      <td class="td4">${value.num_of_players}/8</td>`;
    if (value.num_of_players < 8) {
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
      </td>
      <td class="td6">
        <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST">
          <button id="join_game${index}" type="submit" class="disabledBtn btn btn-success" disabled="true">Click to join </button>
        </form>
      </td>`;
    }
    // let rowHtml = `<th style="border:1px solid red">GAME ${value.game_id}</th>
    // <th style="border:1px solid red">${value.screen_name}</th>
    // <th style="border:1px solid red">${value.cnt}</th>`;
    //
    // if (value.game_status === 'OPEN') {
    //   rowHtml += `
    //   <th style="border:1px solid red">
    //     <form id="join_form${index}" action="/game/${value.game_id}/join" method="POST">
    //       <input name="game_id" type="hidden" value="${value.game_id}"/>
    //       <button id="join_game${index}" type="submit" class="dataSub btn btn-success">${value.game_status} </button>
    //     </form>
    //   </th>
    //   `
    // } else {
    //   rowHtml += `<th style="border:1px solid red">${value.game_status}</th>`
    // }
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
  setTimeout(worker, 100);
});
