const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

canv.width = 1200;
canv.height = 700;

const cw = canv.width;
const ch = canv.height;

const gameInterval = 1000 / 100;
let gameTime = 0;
let gameStatus = true;

const playerSize = 44;
let playerX = cw / 2 - playerSize / 2;
let playerY = ch - 20;

const bulletSize = 10;
bullets = [];

const enemySize = 46;
let newEnemiesRatio = 1300; // enemies appears every x miliseconds
enemies = [];
let enemyCounter = 0

canv.addEventListener("mousemove", playerPosition);
canv.addEventListener("mousedown", bulletPosition);

let timerID = setInterval(game, gameInterval);

function game() {

    gameTime += gameInterval;
    if (gameTime % 20000 == 0) {
        newEnemiesRatio -= 100;
    }

    drawArea()
    drawPlayer()
    drawBullets()
    drawEnemies()
    enemiesPosition()
    checkGame()
}

function drawArea() {
    ctx.fillStyle = "midnightblue";
    ctx.fillRect(0, 0, cw, ch);
}

function playerPosition(e) {
    let leftCanvas = canv.offsetLeft;
    playerX = e.clientX - leftCanvas - playerSize / 2;
}

function drawPlayer() {
    
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX + playerSize / 2, playerY - playerSize);
    ctx.lineTo(playerX + playerSize, playerY);
    ctx.moveTo(playerX, playerY - 0.3 * playerSize);
    ctx.lineTo(playerX + playerSize / 2, playerY - 1.3 * playerSize);
    ctx.lineTo(playerX + playerSize, playerY - 0.3 * playerSize);

    ctx.moveTo(playerX + 0.25 * playerSize, playerY - 0.75 * playerSize);
    ctx.lineTo(playerX + 0.5 * playerSize, playerY - 1.5 * playerSize);
    ctx.lineTo(playerX + 0.75 * playerSize, playerY - 0.75 * playerSize);
    ctx.fillStyle = "greenyellow";
    ctx.fill();
}

function bulletPosition() {
    bullets.push({x: playerX + playerSize / 2, y: playerY - 1.31 * playerSize - bulletSize})
}

function drawBullets() {
    //drawing bullets
    ctx.fillStyle = "white";
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillRect(bullets[i].x - bulletSize / 4, bullets[i].y, bulletSize / 2, bulletSize);
    }

    //adding value y to bullets for moving them
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bulletSize;
    }

    //deleting finished bullets
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
        }
    }
}

function enemiesPosition() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemies[i].v;
    }     
}

function drawEnemies() {
    //creating new enemies
    if (Math.round(gameTime) % newEnemiesRatio == 0) {
        enemies.push({x: Math.floor(Math.random() * (cw - enemySize - 1) + 1), y: -enemySize, v: 0.4 + Math.random()});
    }

    //drawing enemies
    for (let i = 0; i < enemies.length; i++) {
        drawOneEnemy(enemies[i].x, enemies[i].y, enemySize);
    }   

    //delete hit enemies and bullet
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            hitCondition = (bullets[j].y < enemies[i].y + enemySize) && 
                            (bullets[j].x >= enemies[i].x) && 
                            (bullets[j].x <= enemies[i].x + enemySize);
            if (hitCondition) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                enemyCounter++;
            }
            
        }
    }    

    //loosing game if enemy get the end
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].y + enemySize > ch) {
            gameStatus = false;  
        }
    } 
}

function drawOneEnemy(x, y, size) {
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.fillRect(x + size/4, y + size/4, size/2, size/2);
    ctx.fillStyle = "beige";
    ctx.fillRect(x + 0.37 * size, y + 0.37 * size, size/4, size/4);
    ctx.moveTo(x, y);
    ctx.lineTo(x + size/2, y + size/4);
    ctx.lineTo(x+ size, y);
    ctx.lineTo(x + 0.75 * size, y + size/2);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + size/2, y + 0.75 * size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x + 0.25 * size, y + size/2);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "yellow"
    ctx.stroke();
}

function checkGame() {
    let statusText = document.querySelector('h2');

    if (gameStatus) {
        statusText.innerText = `Gra trwa... ${Math.round(gameTime / 1000)}sec 
                                Wynik: ${enemyCounter}`
    } else {
        clearInterval(timerID);
        statusText.style.color = "green";
        statusText.innerText = `Koniec gry! 
                                czas gry: ${Math.round(gameTime / 1000)}sec, wynik: ${enemyCounter}`
    }
    
}