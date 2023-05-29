# Movie Trivia Showdown 
This is the repository for the Real-Time Web 2223 project. The project is a real-time web application that allows users to join a chat and play a trivia game together. The application is built using Node.js, Express and Socket.IO.
![Trivia Game screenshot](https://raw.githubusercontent.com/AllyssaA/real-time-web-2223/main/static/img/Screenshot%202023-05-29%20at%2018.29.34.png)

# Live Demo
[Adaptable](https://trivia-game.adaptable.app/)

[Railway](https://real-time-web-2223-production-31c0.up.railway.app/)

# Concept
Movie Trivia Showdown is an exciting online trivia game that challenges players' knowledge of films from various genres, eras, and cultures. This concept utilizes the provided code to create a multiplayer movie trivia experience, where participants compete to test their movie knowledge and claim the title of the ultimate movie buff.

# Dependencies
Dependencies used in this project:
- EJs
- Express
- Node-fetch
- Socket IO

# Open Trivia DB API
[Open Trivia DB API](https://opentdb.com/api_config.php)

The Open Trivia DB API is used to fetch a set of trivia questions from a specific category (in this case, category ID 11 which is "Entertainment: Film") and generate a quiz game based on the questions returned from the API.

When the server starts, it uses the fetch function to make a request to the Open Trivia DB API. The API sends back a JSON object with a list of trivia questions and their corresponding answers. The server then shuffles the answers using a method called the Fisher-Yates algorithm, and creates a question object for each question. Each question object includes the question text, correct answer, incorrect answers, and all answers shuffled. These question objects are then stored in an array called triviaQuestions. This array of shuffled trivia questions with correct and incorrect answers is used in the trivia game.

# Data life cycle
![Data life cycle](https://raw.githubusercontent.com/AllyssaA/real-time-web-2223/c0de2dae2fc1d925b55db9fb5adde9b7809be32f/static/img/datalifecycle.png)

# Features

Establishing Socket Connection:
- The code initializes a socket connection with the server using io().
  
Sending and Receiving Messages:
- The code listens for form submissions and sends messages to the server via the socket connection when the form is submitted.
- Received messages from other users are displayed in the chat window by appending list items to the <ul> element.
 
User Registration and User List Update:
- Upon loading the page, the code prompts the user to enter a username using window.prompt().
- The entered username is emitted to the server as a "newUser" event.
- The server maintains a list of online users, and when a user joins or leaves the chat, the updated user list is received by the client and displayed on the page.
 
Question Handling:
 - When a new question is received from the server, it is displayed on the page.
 - The code dynamically creates buttons for each answer option and attaches click event listeners to them.
 - When a player selects an answer, the chosen answer is emitted to the server as an "answerSelected" event.

Correct Answer and Score Update:
- If a player selects the correct answer, the server sends a "correctAnswer" event to notify all clients.
- The correct answer, the user who guessed correctly, and the updated scores are displayed in the chat window.

Game Over and Restart:
- When the game ends (no more questions), the server sends a "gameOver" event to all clients, indicating the winner and the final scores.
- The question and answer elements are removed from the page, and a game over message is displayed.
- If the game is set to restart, a restart button is added, allowing players to restart the game by emitting a "restartGame" event to the server. (doesn't work yet)

Server-side Functionality:
- The server is implemented using Express.js.
- It serves the static files (HTML, CSS, JavaScript) and uses EJS as the template engine.
- The server fetches trivia questions from an API and stores them in the triviaQuestions array.
- The server handles socket events such as new messages, new users, answer selection, and disconnection.
- It keeps track of scores, selects random questions, and handles game over conditions.

 
# Real time events
Client side socket events
- socket.emit("newUser", username): Emits a "newUser" event to the server with the provided username when a new user joins the game.
- socket.emit("newMsg", input.value): Emits a "newMsg" event to the server with the input message when the user submits a form.
- socket.on("sendMessage", (message) => {...}): Listens for a "sendMessage" event from the server and handles the received message by appending it to the chat messages section.
- socket.on("updateUserList", (userList) => {...}): Listens for an "updateUserList" event from the server and updates the user list on the client-side.
- socket.on("newQuestion", (question) => {...}): Listens for a "newQuestion" event from the server and updates the current question and answer options on the client-side.
- socket.on("correctAnswer", (data) => {...}): Listens for a "correctAnswer" event from the server and handles the received data when a user guesses the correct answer.
- socket.on("gameOver", ({ winner, scores, restart }) => {...}): Listens for a "gameOver" event from the server and handles the received data when the game ends.

Server side socket events 
- socket.emit("newQuestion", currentQuestion): Emits a "newQuestion" event to the connected client with the current question and answer options.
- socket.on("newMsg", (message) => {...}): Listens for a "newMsg" event from the client and broadcasts the message to all connected clients.
- socket.on("newUser", (user) => {...}): Listens for a "newUser" event from the client and handles the new user by adding them to the user list.
- socket.on("answerSelected", (answer) => {...}): Listens for an "answerSelected" event from the client and checks if the selected answer is correct, updating scores and emitting a "correctAnswer" event.
- socket.on("disconnect", () => {...}): Listens for a "disconnect" event from the client and removes the disconnected user from the user list.


must have
- [x]  Username input in chat
- [x]  Create userlist
- [x]  Update userlist
- [x]  Fetch trivia questions from API
- [x]  Return trivia question to users

should have
- [ ] User has left the chat
- [x] Keep up score

could have
- [ ] Multiple chat rooms per category
- [ ] Difficulty Easy/Medium/Hard


 

<!-- Here are some hints for your projects Readme.md! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use MIT. 📜  -->
