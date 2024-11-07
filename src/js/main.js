const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const userNameInput = document.getElementById('userName');
const messageInput = document.getElementById('messageInput');

// Function to add a message to the chat window
export function AddMessage(user, text, classname) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(classname);
    messageElement.innerHTML = `
      <span class="user">${user}:</span>
      <span class="text">${text}</span>
    `;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Handle form submission to send a message
chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const user = userNameInput.value.trim();
    const text = messageInput.value.trim();

    if (user && text) {
        fetch("https://openchatroom.glitch.me/post/form/", {
            method: "post",
            body: new FormData(chatForm)
        })
        messageInput.value = ''; // Clear the message input
    }
});
