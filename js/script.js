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