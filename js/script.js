const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText')
const score = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

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
    {question: "What's up",
    choice1: "hdaey",
    choice2: "hadfi",
    choice3: "nopdae",
    choice4: "nottdaoday",
    answer: 3,
        },
        {question: "How do you succeed?",
        choice1: "hey",
        choice2: "hi",
        choice3: "nope",
        choice4: "nottoday",
        answer: 4,
            },
            {question: "How do you succeed?",
            choice1: "hey",
            choice2: "hi",
            choice3: "nope",
            choice4: "nottoday",
            answer: 2,
                },
                {question: "How do you succeed?",
                choice1: "hey",
                choice2: "hi",
                choice3: "nope",
                choice4: "nottoday",
                answer: 2,
                    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 6

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

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        })

    })
})

incrementScore = num => {
    score+=num
    scoreText.innerText = score
}