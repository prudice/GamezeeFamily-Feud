document.addEventListener('DOMContentLoaded', () => {
    const welcomePage = document.getElementById('welcome-page');
    const gamePage = document.getElementById('game-page');
    const startGameBtn = document.getElementById('start-game-btn');
    const categoryMenu = document.getElementById('category-menu');
    const questionSection = document.getElementById('question-section');
    const answerCardsContainer = document.getElementById('answer-cards');
    const pointsList = document.getElementById('points-list');
    const totalPointsDisplay = document.getElementById('total-points');
    const timerElement = document.getElementById('timer');
    const strikesCountElement = document.getElementById('strikes-count');
    const correctSound = document.getElementById('correct-sound');
    const strikeSound = document.getElementById('strike-sound');

    let totalPoints = 0;
    let strikes = 0;
    let timer;
    let timerCountdown;

    const questions = {
        1: {
            text: "What do you often see in an urban area?",
            answers: [
                { text: "Traffic", points: 10 },
                { text: "Skyscrapers", points: 8 },
                { text: "Public Transport", points: 6 },
                { text: "Street Vendors", points: 4 },
                { text: "Parks", points: 2 }
            ]
        },
        2: {
            text: "What do people do in suburban areas for fun?",
            answers: [
                { text: "Barbecue", points: 10 },
                { text: "Pool Parties", points: 8 },
                { text: "Picnics", points: 6 },
                { text: "Park Walks", points: 4 },
                { text: "Sports", points: 2 }
            ]
        },
        // Add more questions and answers for other categories
    };

    // Start Game
    startGameBtn.addEventListener('click', () => {
        welcomePage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });

    // Category Selection
    categoryMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('category')) {
            const categoryId = event.target.dataset.category;
            loadQuestion(categoryId);
        }
    });

    // Load question based on category
    function loadQuestion(categoryId) {
        const question = questions[categoryId];
        if (question) {
            questionSection.classList.remove('hidden');
            document.getElementById('question-text').textContent = question.text;

            // Create answer cards
            answerCardsContainer.innerHTML = '';
            question.answers.forEach((answer, index) => {
                const card = document.createElement('div');
                card.classList.add('answer-card');
                card.dataset.points = answer.points;
                card.innerHTML = `<span class="front">?</span><span class="back">${answer.text} - ${answer.points} Points</span>`;
                card.addEventListener('click', handleAnswerClick);
                answerCardsContainer.appendChild(card);
            });

            startTimer();
        }
    }

    // Handle answer click
    function handleAnswerClick(event) {
        const card = event.currentTarget;
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            const points = parseInt(card.dataset.points);
            totalPoints += points;
            correctSound.play();

            // Display points next to answer
            const listItem = document.createElement('li');
            listItem.textContent = `Answer: ${points} points`;
            pointsList.appendChild(listItem);

            // Update total points
            totalPointsDisplay.textContent = totalPoints;

            clearInterval(timerCountdown); // Stop timer if answer is correct
        }
    }

    // Start the timer
    function startTimer() {
        let timeRemaining = 30;
        timerElement.textContent = timeRemaining;
        timerCountdown = setInterval(() => {
            timeRemaining -= 1;
            timerElement.textContent = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timerCountdown);
                handleStrike(); // Strike for not answering in time
            }
        }, 1000);
    }

    // Handle a strike
    function handleStrike() {
        strikes += 1;
        strikesCountElement.textContent = strikes;
        strikeSound.play();
        if (strikes >= 3) {
            alert('Three strikes! Game over.');
            resetGame();
        }
    }

    // Reset the game after strikes or completion
    function resetGame() {
        totalPoints = 0;
        strikes = 0;
        totalPointsDisplay.textContent = totalPoints;
        strikesCountElement.textContent = strikes;
        pointsList.innerHTML = '';
        questionSection.classList.add('hidden');
    }
});