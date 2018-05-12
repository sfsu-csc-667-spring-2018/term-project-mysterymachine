const socket = io('/game/${game_id}');

document.querySelector('#chat-message-form').addEventListener('submit', event => {
    fetch('game/${game_id}/chat', {
        body: JSON.stringify({message}),
        credentials: 'include',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'})
    });
});

socket.on('message', ({game_id, message}) => {
    //append
})