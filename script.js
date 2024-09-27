const questions = [
    {
        question: "Name something you do before going to bed.",
        answers: [
            { text: "Brush your teeth", score: 30 },
            { text: "Turn off the lights", score: 25 },
            { text: "Check your phone", score: 20 },
            { text: "Read a book", score: 15 },
            { text: "Set your alarm", score: 10 }
        ]
    },
    {
        question: "Name something you might find in a kitchen.",
        answers: [
            { text: "Refrigerator", score: 35 },
            { text: "Stove", score: 25 },
            { text: "Sink", score: 20 },
            { text: "Dishwasher", score: 10 },
            { text: "Microwave", score: 5 }
        ]
    }
    // You can add more questions and answers here.
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-question');

// Load the first question
loadQuestion();

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer buttons dynamically
    currentQuestion.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.textContent = answer.text;
        answerDiv.style.visibility = 'visible'; // Make answers visible
        answerDiv.addEventListener('click', () => revealAnswer(index));
        answersContainer.appendChild(answerDiv);
    });
}

function revealAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers[index];
    
    score += selectedAnswer.score;
    scoreElement.textContent = score;

    const answerDivs = document.querySelectorAll('.answer');
    answerDivs[index].style.backgroundColor = '#28a745'; // Highlight the selected answer
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Game Over! Final Score: " + score;
        nextButton.disabled = true;
        answersContainer.innerHTML = ''; // Hide the answers
    }
});
