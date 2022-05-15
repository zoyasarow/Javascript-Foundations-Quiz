var quizBox = document.getElementById('quiz-box').style = 'display: none;'
var startBtn = document.getElementById('start-btn');
var questions = document.getElementById('question-text');
var answerOptions = document.getElementsByClassName('answer-options');
var result = document.getElementById('results');
var nextBtn = document.getElementById('next-btn');
var restartBtn = document.getElementById('restart-btn');
var timerText = document.getElementById('time-text');
var seconds = 60;

//question & answer array
var questionsAll = [
{
    question: 'What is NOT an example of a Javascript data type?',
    correctAnswer: 'Symbol',
    choices: ['String', 'Boolean', 'Number','Symbol', 'Object', 'Undefined',],
},
{
    question: 'Which company created Javascript?',
    correctAnswer: 'Netscape',
    choices: ['Netscape', 'Adobe', 'IBM', 'MSC Software',],
    
},
{
    question: 'What does the === operator represent?',
    correctAnswer: 'equal value and equal type',
    choices: ['equal to', 'ternary operator', 'equal value and equal type', 'typeof',],
},
{
    question: 'What is Null in Javascript?',
    correctAnswer: 'Intentional absence of object value',
    choices: ['Broken code', 'A function', 'Intentional absence of object value', 'A Javascript variable',],   
}];

//functionality that displays questions & answer options
function init() {
    questions.style = 'display: block;'
    answerOptions.style = 'display: block;'
    nextBtn.style = 'display:block;'
    renderQuiz();
}

function renderQuiz() {
    questions.textContent = questionsAll[currentIndex].question;
    answerOptions.textContent = questionsAll[currentIndex].choices;
    result.textContent = questionsAll[currentIndex].correctAnswer;
}

//functionality to start quiz once clicking 'start quiz' button and other start functions
startBtn.addEventListener('click', function () {
    var quizBox = document.getElementById('quiz-box').style = 'display: block;'
    timer();
})

// functionality that saves score to local storage
function saveScore() {
    var currentScores = JSON.parse(localStorage.getItem('results')) || []
    var name = prompt('Please enter your name:')
    var userObj = {
        name,
        results
    }
    currentScores.push(userObj)
    localStorage.setItem('results', JSON.stringify(currentScores))
}

//functionality that runs timer 
function timer() {
    var quizTimer = setInterval(function() {
        if(timerText === 0) {
            clearInterval(quizTimer);
            endQuiz();
        }
        timerText.textContent = timerText.innerHTML + seconds;
        seconds--
    }, 1000);
}

