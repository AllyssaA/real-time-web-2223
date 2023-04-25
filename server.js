/*
https://socket.io/get-started/chat
*/

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const fetch = require("node-fetch");
const port = process.env.PORT || 5000;

// const historySize = 50;
// let history = [];

//  Templating files
app.set("views", "views");

app.set("view engine", "ejs");

app.use(express.static(path.resolve("static")));

// // index route
// app.get("/", (req, res) => {
//   res.render("index", {
//     pageTitle: "Chat",
//   });
// });

// const renderPage

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   io.emit("history", history);

//   socket.on("message", (message) => {
//     while (history.length > historySize) {
//       history.shift();
//     }
//     history.push(message);

//     io.emit("message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// http.listen(port, () => {
//   console.log("listening on port ", port);
// });

// TODO: trivia questions
const renderPage = (req, res) => {
  try {
    fetch("https://opentdb.com/api.php?amount=30&category=11")
      .then((response) => response.json())
      .then((data) =>
        res.render("index", {
          data: data.results,
          userList,
          pageTitle: "Chat | hi",
        })
      );
  } catch (err) {
    res.render("error", {
      pageTitle: "Error",
    });
  }
};

app.get("/", renderPage);

const userList = []

io.on('connection', socket => {
  console.log('a user connected')

  const handleName = name => {
    const user = { username: name, id: socket.id }
    userList.push(user)
    console.log(userList)
    io.emit('name', { username: name, id: socket.id })
  }

  const handleDisconnect = () => {
    io.emit('user left', { id: socket.id })

    userList.filter(element => {
      if (element.id !== socket.id) {
        
        return true
      } else {
  
        return false
      }
    })
    console.log('user disconnected')
  }

  socket.on('name', handleName)
  socket.on('disconnect', handleDisconnect)
  // console.log(userList)
})

http.listen(port, () => {
  console.log('listening on port ', port)
})
