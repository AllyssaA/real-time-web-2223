# Trivia Game
This is the repository for the Real-Time Web 2223 project. The project is a real-time web application that allows users to join a chat and play a trivia game together. The application is built using Node.js, Express and Socket.IO.
![Trivia Game screenshot](https://github.com/AllyssaA/real-time-web-2223/blob/main/static/img/trivia-game.png)

# Live Demo
[Trivia Game](https://trivia-game.adaptable.app/)

# Concept
A trivia game with a chat feature where multiple users can connect and chat with each other while playing. The first user who gets 5 points wins. 

# Dependencies
- EJs
- Express
- Node-fetch
- Socket IO

# Open Trivia DB API

[Open Trivia DB API](https://opentdb.com/api_config.php)

The Open Trivia DB API is used to fetch a set of trivia questions from a specific category (in this case, category ID 11 which is "Entertainment: Film") and generate a quiz game based on the questions returned from the API.

When the server starts, it uses the fetch function to make a request to the Open Trivia DB API. The API sends back a JSON object with a list of trivia questions and their corresponding answers. The server then shuffles the answers using a method called the Fisher-Yates algorithm, and creates a question object for each question. Each question object includes the question text, correct answer, incorrect answers, and all answers shuffled. These question objects are then stored in an array called triviaQuestions. This array of shuffled trivia questions with correct and incorrect answers is used in the trivia game.

# Data life cycle

# Socket events



must have
- [ ] incomplete task
- [ ]  Username input in chat
- [ ]  Create userlist
- [ ]  Update userlist
- [ ]  Fetch trivia questions from API
- [ ]  Return trivia question to users

should have
- [ ] User has left the chat
- [ ] Ranking system

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
