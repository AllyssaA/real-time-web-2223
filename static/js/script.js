let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});

socket.on("message", (message) => {
  addMessage(message);
});

socket.on("history", (history) => {
  history.forEach((message) => {
    addMessage(message);
  });
});

function addMessage(message) {
  messages.appendChild(
    Object.assign(document.createElement("li"), { textContent: message })
  );
  messages.scrollTop = messages.scrollHeight;
}

formName.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("name", input.value);
    input.value = "";
    if (username.length > 0) {
      //Emit to the server the new user
      socket.emit("new user", username);
    }
  }
});
