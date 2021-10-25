const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("msg-container");
const messageInput = document.getElementById("input-message");
const messageSendBtn = document.getElementById("send-button");

const name = prompt("what is your name?");
appendMessage(`you joined`);

socket.emit("new-user", name);

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}:${data.message}`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
