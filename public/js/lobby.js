const socket = io('/lobby');

document.querySelector('#chat-message-form').addEventListener('submit', event => {
    event.stopPropagation();
    event.preventDefault();

    const message = document.querySelector('#message').value;
    fetch('/chat', {
        body: JSON.stringify({message}),
        credentials: 'include',
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'})
    });

    console.log('lobby event listener: ' + JSON.stringify({message}));
    document.getElementById('chat-message-form').reset();
});

socket.on('message', ({message}) => {
    console.log('lobby listener');
    var parent = document.createElement('parent');
    var child = document.createElement('child');
    var chatBox = document.getElementById('chatbox');
    var messages = document.querySelector('#messages');

    child.className = 'child-message';
    child.innerText = user + ': ' + message;
    parent.appendChild(child);
    messages.appendChild(parent);
})