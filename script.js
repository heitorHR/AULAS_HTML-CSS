
const gameContainer = document.querySelector('.game-container');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const ball = document.getElementById('ball');


const gameWidth = gameContainer.offsetWidth;
const gameHeight = gameContainer.offsetHeight;
const paddleSpeed = 10;
const ballSpeed = 4;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballDX = ballSpeed;
let ballDY = ballSpeed;

let paddleLeftY = gameHeight / 2 - paddleLeft.offsetHeight / 2;
let paddleRightY = gameHeight / 2 - paddleRight.offsetHeight / 2;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    }
    if (event.key === 's' && paddleLeftY < gameHeight - paddleLeft.offsetHeight) {
        paddleLeftY += paddleSpeed;
    }
    if (event.key === 'ArrowUp' && paddleRightY > 0) {
        paddleRightY -= paddleSpeed;
    }
    if (event.key === 'ArrowDown' && paddleRightY < gameHeight - paddleRight.offsetHeight) {
        paddleRightY += paddleSpeed;
    }

    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;
});

// Lógica da bola
function updateBall() {
    ballX += ballDX;
    ballY += ballDY;

    if (ballY <= 0 || ballY >= gameHeight - ball.offsetHeight) {
        ballDY *= -1;
    }

   
    if (
        (ballX <= paddleLeft.offsetWidth + 10 && ballY >= paddleLeftY && ballY <= paddleLeftY + paddleLeft.offsetHeight) ||
        (ballX >= gameWidth - paddleRight.offsetWidth - 20 && ballY >= paddleRightY && ballY <= paddleRightY + paddleRight.offsetHeight)
    ) {
        ballDX *= -1;
    }


    if (ballX <= 0 || ballX >= gameWidth - ball.offsetWidth) {
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function resetBall() {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballDX = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ballDY = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}


function gameLoop() {
    updateBall();
    requestAnimationFrame(gameLoop);
}

resetBall();
gameLoop();