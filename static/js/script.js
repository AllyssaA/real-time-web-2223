let socket = io();
let messages = document.querySelector("section ul");
let input = document.querySelector("input");
let currentQuestion = null;

const username = window.prompt("Enter username");
socket.emit("newUser", username);

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value) {
    socket.emit("newMsg", input.value);
    input.value = "";
  }
});

socket.on("sendMessage", (message) => {
  messages.appendChild(
    Object.assign(document.createElement("li"), {
      textContent: message.user + " : " + message.message,
    })
  );
  messages.scrollTop = messages.scrollHeight;
});

// handle the "updateUserList" event emitted by the server
socket.on("updateUserList", (userList) => {
  const userListElement = document.getElementById("user-list");
  userListElement.innerHTML = ""; // clear the previous user list

  for (let i = 0; i < userList.length; i++) {
    const userElement = document.createElement("li");
    const username = document.createTextNode(userList[i]);
    userElement.appendChild(username);
    userListElement.appendChild(userElement);
  }
});

socket.on("newQuestion", (question) => {
  currentQuestion = question;
  const questionElement = document.getElementById("question");
  questionElement.textContent = currentQuestion.question;

  const answerElement = document.getElementById("answers");
  answerElement.innerHTML = "";

  //Create a button for each answer option
  currentQuestion.allAnswers.forEach((answer) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = answer;
    answerElement.appendChild(buttonElement);

    // Add click event listener to each button
    buttonElement.addEventListener("click", () => {
      socket.emit("answerSelected", answer);
    });
  });
});

socket.on("correctAnswer", (data) => {
  messages.appendChild(
    Object.assign(document.createElement("li"), {
      textContent: `${data.user} guessed the correct answer (${
        data.answer
      })! Scores: ${JSON.stringify(data.scores)}`,
      className: "system-message",
    })
  );
  messages.scrollTop = messages.scrollHeight;
});

socket.on("gameOver", ({ winner, scores, restart }) => {
  const message = winner
    ? `${winner} wins with ${scores[winner]} points!`
    : "Game over!";

  // Remove the question and answers elements from the DOM
  const questionElement = document.getElementById("question");
  questionElement.remove();
  const answerElement = document.getElementById("answers");
  answerElement.remove();

  const gameOverElement = Object.assign(document.createElement("div"), {
    id: "game-over",
    innerHTML: `<p>${message}</p>`,
  });

  if (restart) {
    const restartButton = Object.assign(document.createElement("button"), {
      textContent: "Restart",
      onclick: () => {
        socket.emit("restartGame");
        gameOverElement.remove();
        
      },
    });
    gameOverElement.appendChild(restartButton);
  }
  // Add the game over element to the trivia
  const triviaSection = document.querySelector(".trivia");
  triviaSection.appendChild(gameOverElement);
});
