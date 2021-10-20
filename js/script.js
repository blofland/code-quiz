const question = document.querySelector('#question')
const choices = document.querySelector('#question')
const score = document.querySelector('#question')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {question: "How do you succeed?",
choice1: "hey",
choice2: "hi",
choice3: "nope",
choice4: "nottoday",
answer: 2,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    
}