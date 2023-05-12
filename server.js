const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const fetch = require("node-fetch");
const port = process.env.PORT || 5000;

let triviaQuestions = [];
let currentQuestion = null;
const scores = {};

// Templating files
app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static(path.resolve("static")));

// Fisher-Yates algorithm weeee
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const renderPage = (req, res) => {
  try {
    fetch("https://opentdb.com/api.php?amount=5&category=11")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          const allAnswers = shuffleArray([result.correct_answer].concat(
            result.incorrect_answers)
          );
          const question = {
            question: result.question,
            correctAnswer: result.correct_answer,
            incorrectAnswers: result.incorrect_answers,
            allAnswers: allAnswers,
          };
          triviaQuestions.push(question);
          console.log(triviaQuestions);
        });
        // triviaQuestions = data.results;
        // console.log(triviaQuestions);
        res.render("index", {
          data: triviaQuestions,
          userList,
          pageTitle: "Chat | Trivia",
          scores,
        });
      });
  } catch (err) {
    res.render("error", {
      pageTitle: "Error",
    });
  }
};

app.get("/", renderPage);

const userList = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  selectRandomQuestion();
  socket.emit("newQuestion", currentQuestion)

  socket.on("newMsg", (message) => {
    io.emit("sendMessage", {
      message: message,
      user: socket.username,
    });
  });

  socket.on("newUser", (user) => {
    socket.username = user;
    userList.push(user);
    console.log("user joined the chat - : " + socket.username);
    console.log("All connected users " + userList);
    io.emit("updateUserList", userList);
  });

  socket.on("answerSelected", (answer) => {
    if (currentQuestion.correctAnswer === answer) {
      // Update the score for the user who answered correctly
      if (!scores[socket.username]) {
        scores[socket.username] = 1;
      } else {
        scores[socket.username]++;
      }
  
      io.emit("correctAnswer", {
        user: socket.username,
        answer: answer,
        scores: scores
      });
  
      sendNextQuestion();
    }
  });
  

  function sendNextQuestion() {
    // Remove the current question from the triviaQuestions array
    triviaQuestions.splice(triviaQuestions.indexOf(currentQuestion), 1);
  
    if (triviaQuestions.length === 0) {
      // If there are no more questions, end the game
      gameOver();
    } else {
      // Get a random question from the triviaQuestions array
      const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
      currentQuestion = triviaQuestions[randomIndex];
  
      io.emit("newQuestion", currentQuestion);
    }
  }

  socket.on("disconnect", () => {
    const index = userList.indexOf(socket.username);
    if (index !== -1) {
      userList.splice(index, 1);
      io.emit("updateUserList", userList);
    }
    console.log("user disconnected");
  });
});

function selectRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
  currentQuestion = triviaQuestions[randomIndex];
}

function gameOver() {
  // Determine the user with the highest score
  let winner = null;
  let highestScore = 0;
  Object.entries(scores).forEach(([user, score]) => {
    if (score > highestScore) {
      highestScore = score;
      winner = user;
    }
  });

  // Remove all questions from the triviaQuestions array
  triviaQuestions = [];

  // Display a message to all users announcing the winner
  io.emit("gameOver", {
    winner: winner,
    scores: scores,
    restart: true,
  });
}

http.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
