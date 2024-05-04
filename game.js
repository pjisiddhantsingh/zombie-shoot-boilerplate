// Iteration 1: Declare variables required for this game
let score = 0;
// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio('shotgun.mp3');
// Iteration 1.3: Add background sound
let backgroundSound = new Audio('background.mp3');
// Iteration 1.4: Add lives
let lives = 3;
// Iteration 2: Write a function to make a zombie
function makeZombie() {
    const zombie = document.createElement('div');
    zombie.className = 'zombie';
    zombie.style.left = '100%';
    zombie.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    gameContainer.appendChild(zombie);

    // Move zombie
    let moveInterval = setInterval(() => {
        const zombieRect = zombie.getBoundingClientRect();
        if (zombieRect.left <= 0) {
            destroyZombie(zombie, false);
            clearInterval(moveInterval);
            lives--;
            updateScoreAndLives();
            return;
        }
        zombie.style.left = parseInt(zombie.style.left) - 5 + 'px';
    }, 20);
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissed() {
    const zombies = document.querySelectorAll('.zombie');
    zombies.forEach(zombie => {
        const zombieRect = zombie.getBoundingClientRect();
        if (zombieRect.left <= 0) {
            destroyZombie(zombie, false);
            lives--;
            updateScoreAndLives();
        }
    });
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie, shot) {
    if (shot) {
        score++;
    }
    zombie.remove();
    clearInterval(zombieInterval);
}
// Iteration 5: Creating timer
let timer = 0;
let timerInterval;
// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    backgroundSound.play();
    timerInterval = setInterval(() => {
        timer++;
        checkMissed();
        if (timer % 5 === 0) { // Every 5 seconds spawn a zombie
            makeZombie();
        }
    }, 1000);
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateScoreAndLives();
    startGame();
});

document.addEventListener('click', () => {
    shotgunSound.play();
});

