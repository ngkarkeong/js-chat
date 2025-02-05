import { io } from "socket.io-client";
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
console.log(import.meta.env.VITE_SERVER_URL);

const name = prompt("what is your name");
appendMessage("You joined");

const socket = io(import.meta.env.VITE_SERVER_URL);

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.emit("new-user", name);

socket.on("chat-message", ({ message, name }) => {
  appendMessage(`${name} : ${message}`);
});

socket.on("user-connected", (newUserName) => {
  appendMessage(`${newUserName} joined`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerText = message;
  messageContainer.appendChild(messageDiv);
}
