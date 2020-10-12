canv = document.querySelector("canvas");
ctx = canv.getContext("2d");

canv.width = 600;
canv.height = 600;
cw = canv.width;
ch = canv.height;

//initializing vertexes of the triangle with velocity
let vertexes = [
    {x: 300, y: 20, xv: 0.2 + Math.random(), yv: 0.2 + Math.random()},
    {x: 30, y: 500, xv: 0.2 + Math.random(), yv: 0.2 + Math.random()},
    {x: 500, y: 500, xv: 0.2 + Math.random(), yv: 0.2 + Math.random()}
];

function drawTriangle(vertexesList, n_iter, context) {

    let trianglePoints = vertexes;
    let previousPoint = vertexes[1];

    for (let i = 0; i < n_iter; i++) {
        let randomVertexNumber = Math.floor(Math.random() * 3);
        let nextPoint = {
            x: previousPoint.x + (vertexes[randomVertexNumber].x - previousPoint.x)/2,
            y: previousPoint.y + (vertexes[randomVertexNumber].y - previousPoint.y)/2
        }
        trianglePoints.push(nextPoint);
        previousPoint = nextPoint;
    }
    
    trianglePoints.forEach((point) => {
        context.fillStyle = "midnightblue";
        context.fillRect (point.x, point.y, 1, 1);
    });   
}

function drawArea(context) {
    context.fillStyle = "bisque";
    context.fillRect(0, 0, cw, ch);
} 

function moveTriangle() {
    drawArea(ctx);
    drawTriangle(vertexes, 2000, ctx);
    vertexes.forEach((vertex) => {
        vertex.x += vertex.xv;
        vertex.y += vertex.yv;

        if (vertex.x < 0 || vertex.x > cw) {
            vertex.xv = -vertex.xv
        }
        if (vertex.y < 0 || vertex.y > ch) {
            vertex.yv = -vertex.yv
        }
    });
}

let timerID = setInterval(moveTriangle, 1000/500);
