const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const range = document.getElementById('range');
fieldWidth = canvas.getAttribute('width');
fieldHeigth = canvas.getAttribute('height');
const ws = new WebSocket('ws://fep-app.herokuapp.com/');
const status = document.getElementById('status').querySelector('ul')

let x = 50;
let y = 150;

const down = 40;
const up = 38;
const left = 37;
const right = 39;

let arr = [];

canvas.style.background = 'green';

window.addEventListener('keydown', (e) => onButtonPress(e));
colorPicker.addEventListener('change', () => changeParam());
range.addEventListener('change', () => changeParam());

function changeParam(){
    const size = getSize();
    const color = getColor();
    sendNewParameters(updateParametrs(size, color));
}

function sendNewParameters(parameters){
    ws.send(JSON.stringify(parameters))
}
function updateParametrs(newSize, newColor){
    return parameters = {
        action: 'setState',
        payload: { radius: newSize, color: newColor}
    }
}
function updateLocation(x, y){
    return newLocation = {
        action: 'move',
        payload: {x: x, y:y}
    }
}
function onButtonPress(e){
    if(e.keyCode === up){
        moveUp();
    } else if (e.keyCode === right) {
        moveRight();
    } else if (e.keyCode === down){
        moveDown();
    } else if (e.keyCode === left) {
        moveLeft();
    }
    
}

function getColor(){
    let color = colorPicker.value;
    return color;
}
function getSize(){
    let size = range.value;
    return size;
}
function moveUp(){
    y -= 5;
    sendNewParameters(updateLocation(x, y))
}

function moveRight(){
    x += 5;
    sendNewParameters(updateLocation(x, y))
}

function moveDown(){
    y += 5;
    sendNewParameters(updateLocation(x, y))
}

function moveLeft(){
    x -= 5;
    sendNewParameters(updateLocation(x, y))
}


function renderBall(element){
    ctx.fillStyle = element.color;
    ctx.beginPath();
    ctx.arc(element.x, element.y, element.size, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}

ws.onmessage = (e) => getMessage(e);

function getMessage(e) {
    const data = JSON.parse(e.data);
    if (data.action == 'add') {
        createNewBall(data);
    }else if (data.action == "move") {
        moveBall(data);
    } else if (data.action == "setState") {
        setStateBall(data);
    } else if (data.action == "remove") {
        removeBall(data);
    }
}

function createNewBall(data) {
    status.innerHTML += `<li><b>new ball: </b>${data.ballId} was ${data.action}ed`;
    const ballParameters = {
        size: data.payload.radius,
        color: data.payload.color,
        x: 50,
        y: 50,
        id: data.ballId
    }
    renderBall(ballParameters)
    arr.push(ballParameters);
}
function moveBall(data) {
    clearRect(0, 0, fieldHeigth, fieldWidth)
    let element = findElement(data.ballId);
    element.x = data.payload.x;
    element.y = data.payload.y;
    setNewParameters();
}
function setStateBall(data) {
    let element = findElement(data.ballId);
    element.size = data.payload.radius;
    element.color = data.payload.color;
    setNewParameters();
}
function removeBall(data) {
    clearRect(0, 0, fieldHeigth, fieldWidth)
    const index = arr.findIndex((element) => element.id === data.ballId);
    arr.splice(index,1)
    setNewParameters();
}
function setNewParameters() {
    arr.forEach(current => {
        const ballParameters = {
            size: current.size,
            color: current.color,
            x: current.x,
            y: current.y
        }
        renderBall(ballParameters);
    })
}
function clearRect(x, y, height, width){
    ctx.clearRect(x, y, height, width);
}
function findElement(ballId){
    return element = arr.find((element) => element.id === ballId);
}