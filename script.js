document.addEventListener('DOMContentLoaded', () => {
    const welcomePage = document.getElementById('welcome-page');
    const gamePage = document.getElementById('game-page');
    const startGameBtn = document.getElementById('start-game-btn');
    const categoryMenu = document.getElementById('category-menu');
    const questionSection = document.getElementById('question-section');
    const answers = document.querySelectorAll('.answer-card');
    const pointsList = document.getElementById('points-list');
    const totalPointsDisplay = document.getElementById('total-points');
    let totalPoints = 0;

    // Start Game
    startGameBtn.addEventListener('click', () => {
        welcomePage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });

    // Category Selection
    categoryMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('category')) {
            questionSection.classList.remove('hidden');
        }
    });

    // Answer Flip
    answers.forEach(answer => {
        answer.addEventListener('click', function() {
            if (!this.classList.contains('flipped')) {
                this.classList.add('flipped');
                const points = parseInt(this.dataset.points);
                totalPoints += points;
                const listItem = document.createElement('li');
                listItem.textContent = `Answer: ${points} points`;
                pointsList.appendChild(listItem);
                totalPointsDisplay.textContent = totalPoints;
            }
        });
    });
});