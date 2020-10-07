canv = document.getElementById("canvas");
ctx = canv.getContext("2d");

canv.width = 600;
canv.height = 600;
cw = canv.width;
ch = canv.height;
game_interval = 1000 / 6

document.addEventListener("keydown", KeyPush);
//document.addEventListener("mousemove", (e)=> console.log(e))
let timerID = setInterval(game, game_interval);

px = py = 2;  //player position
gs = tc = 20;  //apple size and tail counter
ax = ay = 15;  //apple position
xv = 1;  //x velocity
yv = 0;  //y velocity
trail = [];
tail = 5;
last_direction = 0;
game_time = 0;

function game() {
    px += xv;
    py += yv;

    game_time += game_interval;
    checkGame(game_time, tail, "inforce");

    if (px < 0 || (px+1) * gs > cw || py < 0 || (py+1) * gs > ch) {
        checkGame(game_time, tail, "Kolizja ze ścianą");
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs-2, gs-2);

        if (px != 10 && py != 10 && 
            trail[i].x == px && trail[i].y == py) {
            checkGame(game_time, tail, "Kolizja z ogonem");
        }
    }
    trail.push({x: px, y: py});

    while (trail.length > tail) {
        trail.shift();
    }

    if (ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);

}

function KeyPush(e) {
    switch(e.keyCode) {
        case 37: //Left
            if (last_direction != 39) {
                last_direction = 37;
                xv = -1; yv = 0;
            }
            break;
            
        case 38: //Up
            if (last_direction != 40) {
                last_direction = 38;
                xv = 0; yv = -1;
            }
            break;

        case 39:  //Right
            if (last_direction != 37) {
                last_direction = 39;
                xv = 1; yv = 0;
            } 
            break;       

        case 40: //Down
            if (last_direction != 38) {
                last_direction = 40;
                xv = 0; yv = 1;                
            }   
            break;

        case 27:  //Escape
            checkGame(game_time, tail, "Wyjście z gry");
            break;            
    }
}

function checkGame(game_time, snake_length, message) {

    let statusText = document.querySelector('h2');

    if (message == "inforce") {
        statusText.innerText = `Gra trwa... ${Math.round(game_time / 1000)}sec 
                                długość węża: ${tail}`
    } else {
        clearInterval(timerID);
        statusText.style.color = "red";
        statusText.innerText = `${message} 
                            czas gry: ${Math.round(game_time / 1000)}sec 
                            długość węża: ${snake_length}`;
    }
}
