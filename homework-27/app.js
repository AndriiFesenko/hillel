const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const range = document.getElementById('range');
fieldWidth = canvas.getAttribute('width');
fieldHeigth = canvas.getAttribute('height');

let x = 50;
let y = 150;

let down = 40;
let up = 38;
let left = 37;
let right = 39;

let intervals = [];

ctx.fillStyle = 'yellow';
canvas.style.background = 'green';

window.addEventListener('keydown', (e) => checkWay(e));
colorPicker.addEventListener('change', () => {
    parameters.color = colorPicker.value;
})
range.addEventListener('change', () => {
    parameters.size = range.value;
})
const parameters = {
    color: 'blue',
    size: 20,
}

function checkWay(e){

    myStopFunction(intervals);
    if(e.keyCode === up){
        moveUp();
        setAnimation(moveUp);
    } else if (e.keyCode === right) {
        moveRight();
        setAnimation(moveRight);
    } else if (e.keyCode === down){
        moveDown();
        setAnimation(moveDown);
    } else if (e.keyCode === left) {
        moveLeft();
        setAnimation(moveLeft);
    }
}
function setAnimation(way){
    let myInterval = setInterval(way, 50);
    intervals.push(myInterval);
}
function myStopFunction(element){
    for(let i=0; i<element.length; i++){
        clearInterval(element[i]);
    }
}
function getColor(){
    return ctx.fillStyle = parameters.color;
}
function getSize(){
    return size = parameters.size;
}

function moveUp(){
    getColor();
    let ballSize = getSize();
    y -= 10;
    setBallParameters(x, y, ballSize);
    if(y < ((fieldHeigth - fieldHeigth) + ballSize)){
        moveOpposite(moveDown)
    }
}

function moveRight(){
    getColor();
    let ballSize = getSize();
    x += 10;
    setBallParameters(x, y, ballSize);
    if(x > (fieldWidth - ballSize)) {
        moveOpposite(moveLeft)
    }
}

function moveDown(){
    getColor();
    let ballSize = getSize();
    y +=10;
    setBallParameters(x, y, ballSize);
    if(y > (fieldHeigth - ballSize)){
        moveOpposite(moveUp)
    }
}
function moveLeft(){
    getColor();
    let ballSize = getSize();
    x -= 10;
    setBallParameters(x, y, ballSize);
    if(x < ((fieldWidth - fieldWidth) + ballSize)) {
        moveOpposite(moveRight)
    }
}

function setBallParameters(x, y, ballSize){
    ctx.clearRect(0,0,500,500);
    ctx.beginPath();
    ctx.arc(x,y,ballSize,0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}

function moveOpposite(whereToMove){
    myStopFunction(intervals);
    whereToMove();
    let myInterval = setInterval(whereToMove, 50);
    intervals.push(myInterval);
}