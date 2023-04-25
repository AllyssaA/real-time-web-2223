let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");

const usernameSection = document.querySelector(".index");
const formName = document.querySelector("section > form");
const username = document.querySelector("#name");

const usernames = document.querySelector("header ul");

const users = (user) => {
  const li = document.createElement("li");
  li.setAttribute("id", `text${user.id}`);
  li.innerHTML = `<p>${user.username}</p>`;
  usernames.appendChild(li);
};

const submitUser = (user) => {
  event.preventDefault();
  const value = input.value;
  
    socket.emit("name", value);
    input.value = "";
    // usernameSection
  };

const handleName = (user) => {
  users(user);
};

formName.addEventListener("submit", submitUser);

