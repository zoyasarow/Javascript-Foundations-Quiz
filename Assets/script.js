var quizBox = document.getElementById('quiz-box').style = 'display: none;'
var startBtn = document.getElementById('start-btn');
var questions = document.querySelector('.question-text');
var answerOptions = document.querySelector('.quiz-choices');
var scoreText = document.querySelector('.scoreText');
var nextBtn = document.getElementById('next-btn');
var restartBtn = document.getElementById('restart-btn');
var timerText = document.querySelector('.time-text');
var seconds = 60;
var currentIndex = 0;
var score = 0;

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
    choices: ['Netscape', 'Adobe', 'IBM', 'MSC Software', 'Facebook', 'Twillow',],
    
},
{
    question: 'What does the === operator represent?',
    correctAnswer: 'Equal value and equal type',
    choices: ['Equal to', 'Ternary operator', 'Equal value and equal type', 'Typeof', 'Less than', 'Null'],
},
{
    question: 'What is Null in Javascript?',
    correctAnswer: 'Intentional absence of object value',
    choices: ['Broken code', 'A function', 'Intentional absence of object value', 'A Javascript variable', 'A method', 'An Error'],   
}];

//functionality for displaying variables from array & for loop
function renderQuiz() {
    questions.textContent = questionsAll[currentIndex].question; 
    questionsAll[currentIndex].choices.forEach(element => {
        var btn = document.createElement('button')
        btn.classList.add("quiz-choices")
        btn.innerHTML = element;
        document.getElementById("answer").appendChild(btn);

        btn.addEventListener('click', function () {
            var winningAnswer = questionsAll[currentIndex].correctAnswer;
             if (btn.textContent === winningAnswer) {
                 alert("Correct Answer!")
                 score = score + 10
                 scoreText.textContent = "Score: " + score;
             } else {
                 alert("Wrong Answer!")
             } 
        })
    })
    
}

//functionality for next button & looping through array
nextBtn.addEventListener('click', function() {
    console.log(currentIndex);

    var nextIndex = currentIndex + 1;
// for loop functionality
    if (currentIndex <= 2) {
        currentIndex ++
    
    questions.textContent = questionsAll[nextIndex].question; 
    questionsAll[nextIndex].choices.forEach(element => {
        var previousBtn = document.querySelector(".quiz-choices")
        var btn = document.createElement('button')
        previousBtn.replaceWith(btn)
        btn.classList.add("quiz-choices")
        btn.innerHTML = element;
        document.getElementById("answer").appendChild(btn);

//functionality for answer alerts, score additions and timer deductions
        btn.addEventListener('click', function () {
            var winningAnswer = questionsAll[nextIndex].correctAnswer;
             if (btn.textContent === winningAnswer) {
                 alert("Correct Answer!")
                 score = score + 10
                 scoreText.textContent = "Score: " + score;
             } else {
                 alert("Wrong Answer!")
                 seconds = seconds - 10;
             } 
        })
    })
    } else { //functionality for information input container 
        var container = document.getElementById("answer");
        var userInput = document.createElement('input');
        userInput.classList.add('user-input');
        container.replaceWith(userInput);
        var initials = document.createElement("h3");
        initials.textContent = "Enter Your Initials";
        questions.replaceWith(initials);
        initials.classList.add('initials-styling');

//changing next button to submit button
        var btn = document.createElement('button');
        nextBtn.replaceWith(btn);
        btn.classList.add("next-btn");
        btn.textContent = "Submit";

//getting the score to display with final result text
        btn.addEventListener("click", function () {
            var endResult = userInput.value + ": " + score;
            scoreText.replaceWith(endResult);
            userInput.remove();
            var finalScore = document.createElement("h3");
            finalScore.textContent = "Final Score!";
            finalScore.classList.add('final-results');
            initials.replaceWith(finalScore);
        })
    }
})

//functionality to start quiz once clicking 'start quiz' button and other functions
startBtn.addEventListener('click', function () {
    seconds = 60;
    var quizBox = document.getElementById('quiz-box').style = 'display: block;'
    timer();
    renderQuiz();
    userScore()
})

//functionality for moving through array with next button
answerOptions.addEventListener('click', function () {
    var winningAnswer = questionsAll[currentIndex].correctAnswer;
    console.log(winningAnswer);
})

//functionality for displaying & tracking score 
function userScore() {
    console.log(score);
    scoreText.textContent = "Score: " + score;
}

// functionality that saves score to local storage
function saveScore() {
    var currentScores = JSON.parse(localStorage.getItem('final-results')) || []
    currentScores.push(userObj)
    localStorage.setItem('final-results', JSON.stringify(currentScores))
}

//functionality that runs timer 
function timer() {
    console.log("new changes")
    var quizTimer = setInterval(function () {

        if(seconds === 0) {
            clearInterval(quizTimer);
        }

        timerText.textContent = 'Time Remaining: ' + seconds;
        seconds--
    }, 1000);
}

//functionality for restart button
var quizReset = document.querySelector('.restart-btn')
restartBtn.addEventListener('click', function(){
   window.location.reload(false);
  })


