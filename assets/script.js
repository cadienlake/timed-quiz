// Global Variables
let startQuizbtn = document.querySelector("#startQuiz");
let questionDiv = document.querySelector("#questions");
let questions = [
  { title: "First Question", choices: ["First answer", "Second answer", "Third answer", "fourth answer"], answer: "fourth answer" },
  { title: "Second Question", choices: ["First answer", "Second answer", "Third answer", "fourth answer"], answer: "Answer" },
];
let correctOrNot = ["Correct", "Incorrect"];
// Functions
function startQuiz() {
  alert("I started the game.");
  // Bring up question
  let title = document.createElement("h2");
  title.textContent = questions[0].title;
  questionDiv.appendChild(title);
  // Add four answer options
  let buttonOne = document.createElement("button");
  buttonOne.textContent = questions[0].choices[0];
  buttonOne.dataset.answer = questions[0].answer;
  questionDiv.appendChild(buttonOne);
  let buttonTwo = document.createElement("button");
  buttonTwo.textContent = questions[0].choices[1];
  buttonTwo.dataset.answer = questions[0].answer;
  questionDiv.appendChild(buttonTwo);
  let buttonThree = document.createElement("button");
  buttonThree.textContent = questions[0].choices[2];
  buttonThree.dataset.answer = questions[0].answer;
  questionDiv.appendChild(buttonThree);
  let buttonFour = document.createElement("button");
  buttonFour.textContent = questions[0].choices[3];
  buttonFour.dataset.answer = questions[0].answer;
  questionDiv.appendChild(buttonFour);

  // make clickable
  questionDiv.addEventListener("click", function (event) {
    console.log("clicked");
    let element = event.target;
    if (element.dataset.answer === element.textContent) {
      let verify = document.createElement("p");
      verify.textContent = correctOrNot[0];
      questionDiv.appendChild(verify);
    } else {
      let verify = document.createElement("p");
      verify.textContent = correctOrNot[1];
      questionDiv.appendChild(verify);
    }
  });
}

// Function Calls

startQuizbtn.addEventListener("click", startQuiz);
