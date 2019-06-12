const DOWN_KEY_CODE = 40;
const UP_KEY_CODE = 38;
const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const range = document.getElementById('range');
const fieldWidth = canvas.getAttribute('width');
const fieldHeigth = canvas.getAttribute('height');

const parameters = {
    color: 'blue',
    size: 20,
}

let myParamt = {
    x: 50,
    y: 150
}

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

function checkWay(e){

    myStopFunction(intervals);
    if(e.keyCode === UP_KEY_CODE){
        moveUp();
        setAnimation(moveUp);
    } else if (e.keyCode === RIGHT_KEY_CODE) {
        moveRight();
        setAnimation(moveRight);
    } else if (e.keyCode === DOWN_KEY_CODE){
        moveDown();
        setAnimation(moveDown);
    } else if (e.keyCode === LEFT_KEY_CODE) {
        moveLeft();
        setAnimation(moveLeft);
    }
}
function myStopFunction(element){
    for(let i=0; i<element.length; i++){
        clearInterval(element[i]);
    }
}

function moveUp(){
    getColor();
    let ballSize = getSize();
    myParamt.y -= 10;
    setBallParameters(myParamt.x, myParamt.y, ballSize);
    if(myParamt.y < ((fieldHeigth - fieldHeigth) + ballSize)){
        moveOpposite(moveDown)
    }
}

function moveRight(){
    getColor();
    let ballSize = getSize();
    myParamt.x += 10;
    setBallParameters(myParamt.x, myParamt.y, ballSize);
    if(myParamt.x > (fieldWidth - ballSize)) {
        moveOpposite(moveLeft)
    }
}

function moveDown(){
    getColor();
    let ballSize = getSize();
    myParamt.y +=10;
    setBallParameters(myParamt.x, myParamt.y, ballSize);
    if(myParamt.y > (fieldHeigth - ballSize)){
        moveOpposite(moveUp)
    }
}
function moveLeft(){
    getColor();
    let ballSize = getSize();
    myParamt.x -= 10;
    setBallParameters(myParamt.x, myParamt.y, ballSize);
    if(myParamt.x < ((fieldWidth - fieldWidth) + ballSize)) {
        moveOpposite(moveRight)
    }
}

function setAnimation(way){
    let myInterval = setInterval(way, 50);
    intervals.push(myInterval);
}

function getColor(){
    return ctx.fillStyle = parameters.color;
}
function getSize(){
    return size = parameters.size;
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