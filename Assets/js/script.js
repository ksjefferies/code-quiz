// HTML DOM Get modifiers
var startButton = document.getElementById('start');
var scoreboardButton = document.getElementById('viewHigh')
var nextButton = document.getElementById('next');
var resetButton = document.getElementById('reset')
var answerTrue = document.getElementById('answer-true');
var answerFalse = document.getElementById('answer-false');
var questionElement = document.getElementById('question');
var progressBar = document.getElementById('progressBar');
var countdown = document.getElementById('countdown');
var resetScore = document.getElementById('resetScore')
var scoreList = document.getElementById('scoreList')

var input = document.getElementsByTagName('input');
var labels = document.getElementsByTagName('label');

var createLi = document.createElement('li')

// HTML DOM Set attributes
progressBar.setAttribute('value', '0', 'max', '60');
input[0].setAttribute('type', 'radio', 'name', 'True', 'value', 'true');
input[1].setAttribute('type', 'radio', 'name', 'False', 'value', 'false');

// Event Listeners
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', nextQuestion)
scoreboardButton.addEventListener('click', displayScoreboard)
resetButton.addEventListener('click', resetPage)

answerTrue.addEventListener('click', buttonTrueCheck)
answerFalse.addEventListener('click', buttonFalseCheck)

// Global Variables
var secondsLeft = 45; // Timer initial setting
var questionIndex = 0; // Question array index
var answers = [] // Input answers empty array
var scoreboard = []
var vis = 0;  // //Increment visibility value
var downloadTimer // timer variable
labels[0].classList.add('hidden')

// First time initalization including timer start
function startQuiz() {
  visibility(vis)
  startTimer();
  showQuestion(questionBank[questionIndex])
}

// Helper function to advance question state
function nextQuestion() {
  if (questionIndex >= questionBank.length - 1) {
    vis++;
    visibility(vis)
    answers.push(checkValue())
    clearInterval(downloadTimer);
    calcScore(answers)
  }
  else {
    answers.push(checkValue())
    penalty()
    resetQuestionState()
    questionIndex += 1
    showQuestion(questionBank[questionIndex])
  }
}

function showQuestion(question) {
  questionElement.innerText = question.prompt
}

// check state of radio box and sets true and false value
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

// decrement time value on false answers
function penalty() {
  var i = questionIndex

  if (answers.slice(-1) != questionBank[i].answer) {
    secondsLeft -= 10;
  }
  return;
}

// Calc total score by comparing given answers with answers in question bank
function calcScore(score) {
  var grade = 0;
  var trueAnswers = 0

  for (var i = 0; i < score.length; i++) {
    if (score[i] == questionBank[i].answer) {
      trueAnswers++
    }
    grade = ((trueAnswers / score.length) * 10000)
  }
  highScore(grade);
}

// Retrieve high scores from local storage
function getHighScore() {
  var highList = localStorage.getItem('highScoreList')
  if (highList === null) {
    highList = []
  } else {
    highList = JSON.parse(highList)
  }
  return highList
}

//Prompt user for name and pass final score to place into local storage
function highScore(score) {
  visibility(3);
  var initials = prompt("Enter your initials")
  var highList = getHighScore()

  highList.push({
    user: initials,
    highScore: score,
  });

  highList = highList.sort((a, b) => (a.highScore < b.highScore ? 1 : -1))
  if (highList.length > 3) {
    highList.pop();
  }

  var stringInfo = JSON.stringify(highList);

  localStorage.setItem('highScoreList', stringInfo)
}

// Appends the high scores list item into the HTML from local storage
function displayScoreboard() {
  var pulledItem = getHighScore()
  for (var i = 0; i < pulledItem.length; i++) {
    var createLi = document.createElement('li');
    createLi.innerHTML = pulledItem[i].user + " - " + pulledItem[i].highScore
    scoreList.appendChild(createLi)
  }
}

// cleanup HTML back to baseline
function resetQuestionState() {
  answerTrue.checked = false;
  answerFalse.checked = false;
}

// prevent both buttons from being selected at same time
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

// Reset page when try again is selected
function resetPage() {
  location.reload();
}

// Global visibility settings
// Start of quiz
function visibility(value) {
  if (value === 0) {
    startButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
    labels[0].classList.remove('hidden');
    labels[1].classList.remove('hidden');
    input[0].classList.remove('hidden');
    input[1].classList.remove('hidden');
    progressBar.classList.remove('hidden');
    countdown.classList.remove('hidden');
  }

  // All Questions complete
  if (value === 1) {
    nextButton.classList.add('hidden')
    labels[0].classList.add('hidden')
    labels[1].classList.add('hidden')
    input[0].classList.add('hidden')
    input[1].classList.add('hidden')
    progressBar.classList.add('hidden')
    countdown.classList.add('hidden')
    scoreboardButton.classList.remove("hidden")
  }

  // Quiz Complete, screen cleared all except Try again
  if (value === 2) {
    resetButton.classList.remove('hidden')
    questionElement.classList.add('hidden')
  }

  // Quiz not complete, but time has run out settings
  if (value === 3) {
    nextButton.classList.add('hidden')
    labels[0].classList.add('hidden')
    labels[1].classList.add('hidden')
    input[0].classList.add('hidden')
    input[1].classList.add('hidden')
    progressBar.classList.add('hidden')
    countdown.classList.add('hidden')
    scoreboardButton.classList.remove("hidden")
    resetButton.classList.remove('hidden')
    questionElement.classList.add('hidden')
  }
}

//Questions / Answers Array of Objects
var questionBank = [
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
  downloadTimer = setInterval(function () {
    if (secondsLeft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById('countdown').innerHTML = 'Times Up';
      if (answers.length < questionBank) {
        answers.push(checkValue());
      }
      calcScore(answers);
    }
    else {
      document.getElementById('countdown').innerHTML = secondsLeft + ' seconds remaining';
      progressBar.value = secondsLeft;
    }
    secondsLeft -= 1;
  }, 1000);
}