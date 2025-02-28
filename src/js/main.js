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

export let Endpoint = "https://openchatroom.glitch.me/post/form/"

// Handle form submission to send a message
chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const user = userNameInput.value.trim();
    const text = messageInput.value.trim();
    let authCode = "";
    let authType = "";
    localStorage.setItem("username",user)
    if (localStorage.getItem("endpoint")){
        Endpoint = localStorage.getItem("endpoint") + "/post/form/"
    }

    try {
        authCode = localStorage.getItem("authcode")
        authType = localStorage.getItem("authtype")
        console.log(`Found Auth Data: ${authCode} ${authType}`)
    } catch(error) {
    }
    let formData = new FormData(chatForm)
    formData.append("authcode",authCode)
    formData.append("authtype",authType)

    if (user && text) {
        fetch(Endpoint, {
            method: "post",
            body: formData
        })
        messageInput.value = ''; // Clear the message input
    }
});
