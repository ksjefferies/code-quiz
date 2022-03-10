// HTML DOM modifiers
let startButton = document.getElementById('start');
let answerTrue = document.getElementById('answer-true');
let answerFalse = document.getElementById('answer-false');
let nextButton = document.getElementById('next');
let questionElement = document.getElementById('question');
var progressBar = document.getElementById('progressBar');
var input = document.getElementsByTagName('input')
var labels = document.getElementsByTagName('label');
var resetButton = document.getElementById('reset')
var resetScore = document.getElementById('resetScore')
var scoreboardButton = document.getElementById('viewHigh')
var scoreList = document.getElementById('scoreList')
var createLi = document.createElement('li')
var scoreboard = []

progressBar.setAttribute('value', '0', 'max', '60');
input[0].setAttribute('type', 'radio', 'name', 'True', 'value', 'true');
input[1].setAttribute('type', 'radio', 'name', 'False', 'value', 'false');

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', nextQuestion)
scoreboardButton.addEventListener('click', displayScoreboard)
resetButton.addEventListener('click', resetPage)
resetScore.addEventListener('click', resetHighScore)

answerTrue.addEventListener('click', buttonTrueCheck)
answerFalse.addEventListener('click', buttonFalseCheck)

// Global Variables
let secondsLeft = 60;
let questionIndex = 0;
let answers = []

//Questions / Answers Array of Objects
let questionBank = [
  {
    prompt: 'The number 5 plus the string five equals 10.',
    answer: 'false',
  },
  {
    prompt: 'JavaScript is a server side programming language only. ',
    answer: 'false',
  },
  {
    prompt: 'JavaScript was created in 1995. ',
    answer: 'true',
  },
  {
    prompt: 'Div is a semantic tag. ',
    answer: 'false',
  },
  {
    prompt: 'You link the sytle sheet within the HTML. ',
    answer: 'true',
  },
]

// This function will start the timer countdown
function startTimer() {
  var downloadTimer = setInterval(function () {
    if (secondsLeft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById('countdown').innerHTML = 'Times Up';
    }
    else {
      document.getElementById('countdown').innerHTML = secondsLeft + ' seconds remaining';
      progressBar.value = secondsLeft;
    }
    
    secondsLeft -= 1;
    if(secondsLeft <= 0) {
      resetPage();
    }
  }, 1000);
}

// First time initalization including timer start
function startQuiz() {
  startButton.classList.add('hidden')
  nextButton.classList.remove('hidden')
  labels[0].classList.remove('hidden')
  labels[1].classList.remove('hidden')
  input[0].classList.remove('hidden')
  input[1].classList.remove('hidden')
  startTimer();
  console.log(questionBank[questionIndex])
  showQuestion(questionBank[questionIndex])
 
}

// helper function to advance question state
function nextQuestion() {
  if (questionIndex >= questionBank.length - 1) {
    answers.push(checkValue())
    calcScore(answers)
    // nextButton.innerText = 'Try Again';
    // highScore();
    nextButton.classList.add('hidden')
    scoreboardButton.classList.remove("hidden")
    resetButton.classList.add('hidden');
  }
  else {
    answers.push(checkValue())
    penalty()
    resetQuestionState()
    questionIndex += 1
    showQuestion(questionBank[questionIndex])
    
  }
}

function checkValue() {
  var selectedAnswer;
  if (answerTrue.checked) {
    selectedAnswer = 'true';
  }
  if (answerFalse.checked) {
    selectedAnswer = 'false';
  }
  return selectedAnswer;
}

function penalty() {
  let i = questionIndex

  if (answers.slice(-1) != questionBank[i].answer) {
    secondsLeft -= 10;
  }
  return;
}

function calcScore(score) {
  let grade = 0;
  let trueAnswers = 0

  for (var i = 0; i < score.length; i++) {
    if (score[i] == questionBank[i].answer) {
      trueAnswers++
    }
    grade = ((trueAnswers / score.length) * 10000)
  }
  highScore(grade);
}

function buttonTrueCheck() {
  if (answerTrue.checked) {
    answerFalse.checked = false;
  }
}

function buttonFalseCheck() {
  if (answerFalse.checked) {
    answerTrue.checked = false;
  }
}

function displayScoreboard() {
  questionElement.classList.add('hidden')
  labels[0].classList.add('hidden')
  labels[1].classList.add('hidden')
  input[0].classList.add('hidden')
  input[1].classList.add('hidden')
  scoreboardButton.classList.add('hidden')
  resetButton.classList.remove('hidden')
  // console.log("THIS WORKS");
  for (let i = 0; i < scoreboard.length; i++) {
    var createLi = document.createElement('li');
    createLi.innerHTML = scoreboard[i].initials + " - " + scoreboard[i].score
    scoreList.appendChild(createLi)
  }
}

// cleanup HTML back to baseline
function resetQuestionState() {
  answerTrue.checked = false;
  answerFalse.checked = false;
}

function showQuestion(question) {
  questionElement.innerText = question.prompt
}

function highScore(score) {
  var initials = prompt("Enter your initials")
  scoreboard.push({ initials, score });
  scoreboard.sort((a, b) => (a.score > b.score ? 1 : -1))
  scoreboardButton
}

function resetHighScore() {
  scoreboard.splice(0, scoreboardArr.length)
}

function resetPage() {
  location.reload();
}