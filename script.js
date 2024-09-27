document.addEventListener('DOMContentLoaded', () => {
    const welcomePage = document.getElementById('welcome-page');
    const gamePage = document.getElementById('game-page');
    const startGameBtn = document.getElementById('start-game');
    const categories = document.querySelectorAll('.category');
    const answers = document.querySelectorAll('.answer');
    const pointsList = document.getElementById('points-list');
    const totalPointsDisplay = document.getElementById('total-points');
    let totalPoints = 0;

    // Start Game Button
    startGameBtn.addEventListener('click', () => {
        welcomePage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });

    // Category Selection
    categories.forEach(category => {
        category.addEventListener('click', () => {
            document.getElementById('question-section').classList.remove('hidden');
            // Update question and answers based on selected category (for now, static example)
        });
    });

    // Answer Click Event
    answers.forEach(answer => {
        answer.addEventListener('click', function () {
            if (!this.classList.contains('flipped')) {
                this.classList.add('flipped');
                const points = parseInt(this.dataset.points);
                totalPoints += points;
                // Display points next to answer
                const listItem = document.createElement('li');
                listItem.textContent = `Answer: ${points} points`;
                pointsList.appendChild(listItem);
                // Update total points
                totalPointsDisplay.textContent = totalPoints;
            }
        });
    });
});