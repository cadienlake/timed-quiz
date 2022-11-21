// Global Variables
let enterInitials = document.querySelector("#enterInitials");
let saveScore = document.querySelector("#saveInitials");
let showScores = document.querySelector("#showScores");
let viewScores = document.querySelector("#viewScores");
let wantToStart = document.querySelector("#wantToStart");
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let timerDiv = document.querySelector("#timer");
let verify = document.querySelector("#verify");

let questions = [
  { title: "5+5=?", choices: ["0", "1", "10", "25"], answer: "10" },
  { title: "5-5=?", choices: ["0", "1", "10", "25"], answer: "0" },
  { title: "5x5=?", choices: ["0", "1", "10", "25"], answer: "25" },
  { title: "5/5=?", choices: ["0", "1", "10", "25"], answer: "1" },
];
let correctOrNot = ["Correct", "Incorrect"];
let questionsIndex = 0;
// If the string is undefined, it defaults via the or statement to an empty array
let scores = JSON.parse(localStorage.getItem("scores")) || [];
let score = 0;
// default for timer
let time = 60;
let timer = 0;

// Functions
function startQuiz() {
  // remove highscore list if displayed before start of quiz
  showScores.innerHTML = "";
  // begins timer countdown
  timer = setInterval(function () {
    time--;
    timerDiv.innerHTML = time;
    // Game over if time runs out
    if (time === 0) {
      clearInterval(timer);
      questionDiv.innerHTML = "YOU RAN OUT OF TIME!<br>Game over :(";
    }
  }, 1000);
  wantToStart.innerHTML = "";
  // Call create buttons function
  createQuestion(0);

  // loop to next question when clicking an answer
  questionDiv.addEventListener("click", function (event) {
    console.log("clicked");
    let element = event.target;
    questionsIndex++;
    // end game if no more questions in array
    if (questionsIndex > questions.length - 1 || time === 0) {
      score = time;
      clearInterval(timer);
      // Clear questions
      questionDiv.innerHTML = "";
      // Reveal initials input
      enterInitials.classList.remove("d-none");
    }
    // If the answer is correct, display correct; if incorret, display incorrect and deduct time
    if (element.dataset.answer === element.textContent) {
      verify.innerHTML = correctOrNot[0];
      questionDiv.innerHTML = "";
      createQuestion(questionsIndex);
    } else {
      verify.innerHTML = correctOrNot[1];
      time = time - 10;
      questionDiv.innerHTML = "";
      createQuestion(questionsIndex);
    }
  });
}

// create elements within the html displaying content from the Questions array
function createQuestion(index) {
  let title = document.createElement("h2");
  title.textContent = questions[index].title;
  questionDiv.appendChild(title);
  questions[index].choices.forEach((choice) => {
    let buttons = document.createElement("button");
    buttons.textContent = choice;
    buttons.classList.add("btn-success");
    buttons.dataset.answer = questions[index].answer;
    questionDiv.appendChild(buttons);
  });
}

// Record users initials and the time remaining on the timer as their score.
function enterScore() {
  let initials = document.querySelector("#initials").value;
  let userScore = {
    initials: initials,
    score: score,
  };
  scores.push(userScore);
  // Sort through the top five values of the local storage scores.
  scores.sort((score1, score2) => {
    return score1.score < score2.score ? 1 : -1;
  });
  scores = scores.slice(0, 5);
  localStorage.setItem("scores", JSON.stringify(scores));
}

// display the top scores when clicking the View Highscores link.`
function displayScores(event) {
  event.preventDefault();
  scores.forEach((scr) => {
    showScores.innerHTML += `${scr.initials}: ${scr.score}<br>`;
  });
}

// Function Calls
startQuizbtn.addEventListener("click", startQuiz);
saveScore.addEventListener("click", enterScore);
saveScore.addEventListener("click", displayScores);
viewScores.addEventListener("click", displayScores);
