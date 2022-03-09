var timeleft = 60;

let questionContainer = document.getElementById('question-container')
let questionElement = document.getElementById('question')
let nextButton = document.getElementById('next')
let startButton = document.getElementById('start')
let answerTrue = document.getElementById('answer-true')
let answerFalse = document.getElementById('answer-false')
let questionIndex = 0
let answers = []

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', nextQuestion)

// first time initalization
function startQuiz() {
  startButton.classList.add('hidden')
  nextButton.classList.remove('hidden')
  // answerBox.classList.remove('hidden')
  showQuestion(questionBank[questionIndex])
  questionIndex += 1
}

function checkValue () {
  var selectedAnswer;

  if(answerTrue.checked) {
    selectedAnswer = 'true';
  }
  if(answerFalse.checked) {
    selectedAnswer = 'false';
  }  
  return selectedAnswer;
}

// helper function to advance question state
function nextQuestion() {
  if (questionIndex >= questionBank.length) {
    nextButton.innerText = "Finish"
  }
  else {
    answers.push(checkValue())
    resetQuestionState()
    showQuestion(questionBank[questionIndex])
    questionIndex += 1
  }
}

// cleanup HTML back to baseline
function resetQuestionState() {
  answerTrue.checked = false;
  answerFalse.checked = false;
}
//Turn question bank answers into an array of strings
//questionBank.map(obj => obj.answer)

// modifies DOM elements to display question object supplied
function showQuestion(question) {
  questionElement.innerText = question.prompt
}

var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Times Up";
  }
  else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    document.getElementById("progressBar").value = timeleft;
  }
  timeleft -= 1;
}, 1000);

function calcScore(grade) {
  grade = ((grade / questionBank.length) * 100);
  alert("You got a " + grade + "% on this quiz");
}

var count = localStorage.getItem("count");

let questionBank = [
  {
    prompt: "The number 5 plus the string five equals 10.",
    answer: "b",
  },
  {
    prompt: "JavaScript is a server side programming language only. ",
    answer: "b",
  },
  {
    prompt: "JavaScript was created in 1995. ",
    answer: "a",
  },
  {
    prompt: "Div is a semantic tag. ",
    answer: "b",
  },
  {
    prompt: "You link the sytle sheet within the HTML. ",
    answer: "a",
  },
]

// document.getElementById("startButton").addEventListener("click");

// function askQuestions() {
//   var score = 0;
//   for (var i = 0; i < questionBank.length; i++) {
//     var response = window.prompt(questionBank[i].prompt);
//     if (response == questionBank[i].answer) {
//       score++;
//     }
//   }
//   calcScore(score);
// }

// // Add event listener to generate button
// generateBtn.addEventListener("click", checkCriteria);
