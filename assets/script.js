// Global Variables
let saveScore = document.querySelector("#saveInitials");
let showScores = document.querySelector("#showScores");
let viewScores = document.querySelector("#viewScores");
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let timerDiv = document.querySelector("#timer");
let questions = [
  { title: "First Question", choices: ["First answer", "Second answer", "Third answer", "Fourth answer"], answer: "Fourth answer" },
  { title: "Second Question", choices: ["First answer", "Second answer", "Third answer", "Fourth answer"], answer: "Third answer" },
  { title: "Third Question", choices: ["First answer", "Second answer", "Third answer", "Fourth answer"], answer: "Second answer" },
  { title: "Fourth Question", choices: ["First answer", "Second answer", "Third answer", "Fourth answer"], answer: "First answer" },
];
let correctOrNot = ["Correct", "Incorrect"];
let questionsIndex = 0;
// If the string is undefined, it defaults via the or statement to an empty array
let scores = JSON.parse(localStorage.getItem("scores")) || [];
let score = 0;
let time = 60;
let timer = 0;
// Functions
function startQuiz() {
  timer = setInterval(function () {
    time--;``
    ``;
    timerDiv.innerHTML = time;
  }, 1000);
  alert("I started the game.");
  // Call create buttons function

  // loop through the length of questions, and call create buttons each time
  // switch 0 index

  createQuestion(0);

  // make clickable
  questionDiv.addEventListener("click", function (event) {
    ``;
    console.log("clicked");
    let element = event.target;
    let verify = document.createElement("p");
    questionsIndex++;
    if (questionsIndex > questions.length - 1) {
      alert("Game over");
      score = time;
      clearInterval(timer);
      questionDiv.innerHTML = "";
    }
    if (element.dataset.answer === element.textContent) {
      verify.textContent = correctOrNot[0];
      questionDiv.appendChild(verify);
      createQuestion(questionsIndex);
    } else {
      verify.textContent = correctOrNot[1];
      questionDiv.appendChild(verify);
      time = time - 10;
      createQuestion(questionsIndex);
    }
  });
}

function createQuestion(index) {
  let title = document.createElement("h2");
  title.textContent = questions[index].title;
  questionDiv.appendChild(title);
  questions[index].choices.forEach((choice) => {
    let buttonOne = document.createElement("button");
    buttonOne.textContent = choice;
    buttonOne.dataset.answer = questions[index].answer;
    questionDiv.appendChild(buttonOne);
  });
}

function enterScore() {
  let initials = document.querySelector("#initials").value;
  let userScore = {
    initials: initials,
    score: score,
  };
  scores.push(userScore);
  scores.localStorage.setItem("scores", JSON.stringify(scores));
}

function displayScores(event) {
  event.preventDefault();
  scores.forEach((scr) => {
    showScores.innerHTML += `${scr.initials}: ${scr.score}<br>`;
  });
}

// Function Calls

startQuizbtn.addEventListener("click", startQuiz);
saveScore.addEventListener("click", enterScore);
viewScores.addEventListener("click", displayScores);
