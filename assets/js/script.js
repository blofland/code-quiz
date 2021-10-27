const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

/* timer */

var count = 60;
var interval = setInterval(function () {
    document.getElementById('count').innerHTML = count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        // or...
        alert("You're out of time!");
    }
}, 1000);


var REQIRED_TIME_IN_MS= 60000; 
setTimeout(function(){
    alert("Time has ran out!");
    window.location.href= "ending.html";
},REQIRED_TIME_IN_MS);

/* make questions */
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<javascript>',
        choice3: '<scripting>',
        choice4: '<script>',
        answer: 4,
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choice1: '<script src="xxx.js">',
        choice2: '<script name="xxx.js">',
        choice3: '<script href="xxx.js">',
        choice4: '<script body="xxx.js">',
        answer: 1,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alert("hello World")',
        choice2: 'msgBox("hello World")',
        choice3: 'msg("hello World")',
        choice4: 'alertBox("hello World")',
        answer: 1,
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: 'call myFunction()',
        choice2: 'call function myFunction()',
        choice3: 'myFunction()',
        choice4: '(myFunction)',
        answer: 3,
    },

    {
        question: 'How can you add a comment in a JavaScript?',
        choice1: '//',
        choice2: '<!--',
        choice3: '"*',
        choice4: '$!',
        answer: 1,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('ending.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()