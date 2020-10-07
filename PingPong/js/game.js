const canv = document.querySelector("canvas");
const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 14;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 4;
const lineHeight = 16;

let ballSpeedX = 2.6 + Math.random();
let ballSpeedY = 1.6 + Math.random();
const ballAcceleration = 0.06;

const gameInterval = 10; //miliseconds
let gameStatus = 'inforce';
let gameTime = 0;
const aiRandomSpeedNumber = 1 + Math.random() * 5
console.log(Math.round(Math.random() * 2))

function player() {

    ctx.fillStyle = 'yellow';
    ctx.fillRect(playerX, playerY , paddelWidth, paddelHeight);
}

function ai() {

    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY , paddelWidth, paddelHeight);
}

function ball() {

    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY , ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp()
    }

    if (ballX <= 0) {
        gameStatus = 'loose';
    } else if (ballX + ballSize >= cw) {
        gameStatus = 'win';
    }  

    let playerPaddelCollision = ((ballX < playerX + paddelWidth) && 
                                (ballY + ballSize > playerY) &&
                                (ballY - ballSize < playerY + paddelHeight));

    let aiPaddelCollision = ((ballX + ballSize > aiX) && 
                            (ballY + ballSize > aiY) &&
                            (ballY - ballSize < aiY + paddelHeight));
    
    if (playerPaddelCollision || aiPaddelCollision) {
        ballSpeedX = -ballSpeedX;
    }
}

function table() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    for (let linePositione = 20; linePositione < ch; linePositione += 30) {

        ctx.fillStyle = 'darkgray';
        ctx.fillRect(cw / 2 - lineWidth / 2, linePositione, lineWidth, lineHeight)
    }
}

function playerPosition(e) {

    let topCanvas = canv.offsetTop;
    playerY = e.clientY - topCanvas - paddelHeight / 2;

    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight;
    }

    if (playerY <= 0) {
        playerY = 0;
    }

}

function speedUp() {

    let ballAccelerationtmp = ballAcceleration
    if (ballSpeedX >= 6) {
        ballAccelerationtmp = ballAcceleration / 3;
    }

    if (ballSpeedX > 0 && ballSpeedX < 9) {
        ballSpeedX += ballAccelerationtmp;
    } else if (ballSpeedX < 0 && ballSpeedX > -9) {
        ballSpeedX -= ballAccelerationtmp;
    }

    if (ballSpeedY > 0 && ballSpeedY < 9) {
        ballSpeedY += ballAccelerationtmp;
    } else if (ballSpeedY < 0 && ballSpeedY > -9) {
        ballSpeedY -= ballAccelerationtmp;
    } 

}

function aiPosition() {

    let middlePaddel = aiY + paddelHeight / 2;
    let middleBall = ballY + ballSize / 2;

    if (ballX > 895) { 
        aiY += 0;
    } else if (ballX > 500 && ballX <= 895) 
    {
        if (middlePaddel - middleBall > 200) {
            aiY -= 10 + aiRandomSpeedNumber;
        } else if (middlePaddel - middleBall > 50) {
            aiY -= 5 + aiRandomSpeedNumber;
        } else if (middlePaddel - middleBall < -200) {
            aiY += 10 + aiRandomSpeedNumber;
        } else if (middlePaddel - middleBall < -50) {
            aiY += 5 + aiRandomSpeedNumber;
        }
    } else if (ballX <= 500 && ballX > 150)
    {
        if (middlePaddel - middleBall > 100) {
            aiY -= 3;
        } else if (middlePaddel - middleBall < -100) {
            aiY += 3;
        }
    }

}

canv.addEventListener("mousemove", playerPosition)

function drawGameInfo() {
    let statusText = document.querySelector('h2');
    gameTime += gameInterval / 1000;

    if (gameStatus == 'inforce') {
        statusText.innerText = `Gra trwa...     ${Math.round(gameTime)}sec`;
    } else if (gameStatus == 'win') {
        clearInterval(timerID);
        statusText.style.color = "darkgreen";
        statusText.innerText = `Zwycięstwo, czas gry: ${Math.round(gameTime)}sec`;
    } else {
        clearInterval(timerID);
        statusText.style.color = "red";
        statusText.innerHTML = `Porażka, czas gry: ${Math.round(gameTime)}sec`;
    }
}

function game() {
    table()
    ball()
    player()
    ai()
    aiPosition()
    drawGameInfo()

}

let timerID = setInterval(game, gameInterval);
