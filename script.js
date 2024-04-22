let currentPatternIndex = 0;
let score = 0;
let hp = 290;  // Start with an initial HP value.
let rounds = 0;
const maxRounds = 10;
let startTime, timerInterval;
const normalPatterns = [0, 1, 2]; // Indexes for normal patterns
const enhancedPatterns = [3, 4, 5]; // Indexes for enhanced patterns
const patterns = [
    "images/pattern1.png",
    "images/pattern2.png",
    "images/pattern3.png",
    "images/pattern4.png",
    "images/pattern5.png",
    "images/pattern6.png"
];
const answers = ["boss右侧", "55", "donut", "后", "57", "上下左右"];
const stageImages = {
    full: "images/full_stage.png",
    broken: "images/broken_stage.png"
};


document.addEventListener('DOMContentLoaded', () => {
    restartGame();  // Call restartGame to initialize all settings including random HP
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'q') {
        updateScore(true);
    } else if (event.key === 'w') {
        updateScore(false);
    }
});

function showAnswer() {
    if (!startTime) { // Check if startTime is not set, then set it
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }
    document.getElementById('answerDisplay').innerText = answers[currentPatternIndex];
    document.getElementById('patternTypeDisplay').innerText = "Pattern Type: " + (currentPatternIndex < 3 ? "Normal" : "Enhanced");
    document.getElementById('patternTypeDisplay').style.display = 'block';
}


function nextPattern() {
    rounds++;
    if (rounds >= maxRounds) {
        endGame();
        return;
    }
    updateHP();
    determinePattern();
    document.getElementById('hpDisplay').innerText = "Boss HP: " + hp;
    document.getElementById('patternImage').src = patterns[currentPatternIndex];
    document.getElementById('patternImage').style.display = 'block';
    document.getElementById('stageImage').src = hp > 160 ? stageImages.full : stageImages.broken;
    document.getElementById('stageImage').style.display = 'block';
    document.getElementById('patternTypeDisplay').style.display = 'none'; // Hide until shown

    // Clear the answer display when the next pattern is loaded
    document.getElementById('answerDisplay').innerText = ""; 
}

function updateTimer() {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    document.getElementById('timerDisplay').innerText = "Time: " + elapsed + "s";
}

function determinePattern() {
    if ((hp <= 290 && hp >= 255) || (hp >= 90 && hp <= 160)) {
        currentPatternIndex = normalPatterns[Math.floor(Math.random() * normalPatterns.length)];
        document.getElementById('patternTypeDisplay').innerText = "Pattern Type: Normal";
    } else if ((hp >= 161 && hp <= 254) || (hp >= 0 && hp <= 89)) {
        currentPatternIndex = enhancedPatterns[Math.floor(Math.random() * enhancedPatterns.length)];
        document.getElementById('patternTypeDisplay').innerText = "Pattern Type: Enhanced";
    }
}

function updateHP() {
    hp = Math.floor(Math.random() * 289 + 1);  // Randomize HP for each pattern
}

function updateScore(isCorrect) {
    if (rounds < maxRounds) {
        score += isCorrect ? 1 : 0;
        document.getElementById('scoreDisplay').innerText = "Score: " + score;
        nextPattern();
    }
}

function restartGame() {
    clearInterval(timerInterval);
    startTime = null;
    score = 0;
    rounds = 0;
    document.getElementById('scoreDisplay').innerText = "Score: 0";
    document.getElementById('timerDisplay').innerText = "Time: 0s";
    document.getElementById('restartButton').style.display = 'none';

    randomizeHP();  // Set initial HP to a random value
    determinePattern();  // Determine initial pattern based on initial HP
    document.getElementById('patternImage').src = patterns[currentPatternIndex];
    document.getElementById('patternImage').style.display = 'block';
    document.getElementById('stageImage').src = hp > 160 ? stageImages.full : stageImages.broken;
    document.getElementById('stageImage').style.display = 'block';
}

function randomizeHP() {
    hp = Math.floor(Math.random() * 290 + 1);  // Randomize HP for each new game
    document.getElementById('hpDisplay').innerText = "Boss HP: " + hp;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').innerText += " (Game Over)";
    document.getElementById('restartButton').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    updateHP();  // Set initial HP
    determinePattern();  // Determine initial pattern based on initial HP
    document.getElementById('patternImage').src = patterns[currentPatternIndex];
    document.getElementById('patternImage').style.display = 'block';
    document.getElementById('stageImage').src = hp > 160 ? stageImages.full : stageImages.broken;
    document.getElementById('stageImage').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block'; // Show start button initially
});
