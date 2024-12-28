const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const loserText = document.getElementById('loserText');
const refreshButton = document.getElementById('refreshButton');

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

let objects = [];
let score = 0;
let difficulty = 'normal'; // Default difficulty
let gameOver = false;
let gameInterval;

function createObject() {
    let object = {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        width: 20,
        height: 20,
        color: 'red',
        speed: difficulty === 'normal' ? Math.random() * 2 + 1 : Math.random() * 4 + 2
    };
    objects.push(object);
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObjects() {
    objects.forEach(object => {
        ctx.fillStyle = object.color;
        ctx.fillRect(object.x, object.y, object.width, object.height);
        object.y += object.speed;
    });
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObjects();

    objects = objects.filter(object => object.y < canvas.height);

    objects.forEach(object => {
        if (object.y + object.height >= player.y &&
            object.y <= player.y + player.height &&
            object.x + object.width >= player.x &&
            object.x <= player.x + player.width) {
            score++;
            objects = objects.filter(obj => obj !== object);
        } else if (object.y + object.height >= canvas.height) {
            gameOver = true;
            loserText.style.display = 'block';
            clearInterval(gameInterval); // Stop creating new objects
        }
    });

    requestAnimationFrame(update);
}

function movePlayer(event) {
    if (gameOver) return;

    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function setDifficulty(level) {
    difficulty = level;
    restartGame();
}

function restartGame() {
    objects = []; // Clear existing objects
    score = 0; // Reset score
    gameOver = false; // Reset game over state
    loserText.style.display = 'none'; // Hide loser text
    player.x = canvas.width / 2 - 25; // Reset player position
    clearInterval(gameInterval); // Clear existing interval
    gameInterval = setInterval(createObject, difficulty === 'normal' ? 1000 : 700); // Start creating new objects
    update(); // Restart the game loop
}

document.getElementById('normalButton').addEventListener('click', () => setDifficulty('normal'));
document.getElementById('hardButton').addEventListener('click', () => setDifficulty('hard'));
refreshButton.addEventListener('click', restartGame);

document.addEventListener('keydown', movePlayer);

gameInterval = setInterval(createObject, difficulty === 'normal' ? 1000 : 700);
update();
