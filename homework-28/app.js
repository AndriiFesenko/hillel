const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const range = document.getElementById('range');
const fieldWidth = canvas.getAttribute('width');
const fieldHeigth = canvas.getAttribute('height');
let fieldStartsX = 0;
let fieldStartsY = 0;
const ws = new WebSocket('ws://fep-app.herokuapp.com/');
const status = document.getElementById('status').querySelector('ul')

let myParamt = {
    x: 50,
    y: 150
}

const UP_KEY_CODE = 38;
const RIGT_KEY_CODE = 39;
const DOWN_KEY_CODE = 40;
const LEFT_KEY_CODE = 37;

let arr = [];

canvas.style.background = 'green';

window.addEventListener('keydown', (e) => onButtonPress(e));
colorPicker.addEventListener('change', () => changeParam());
range.addEventListener('change', () => changeParam());

ws.onmessage = (e) => getMessage(e);

function onButtonPress(e){
    if(e.keyCode === UP_KEY_CODE){
        moveUp();
    } else if (e.keyCode === RIGT_KEY_CODE) {
        moveRight();
    } else if (e.keyCode === DOWN_KEY_CODE){
        moveDown();
    } else if (e.keyCode === LEFT_KEY_CODE) {
        moveLeft();
    }
}

function moveUp(){
    myParamt.y -= 5;
    sendNewParameters(updateLocation(myParamt.x, myParamt.y))
}

function moveRight(){
    myParamt.x += 5;
    sendNewParameters(updateLocation(myParamt.x, myParamt.y))
}

function moveDown(){
    myParamt.y += 5;
    sendNewParameters(updateLocation(myParamt.x, myParamt.y))
}

function moveLeft(){
    myParamt.x -= 5;
    sendNewParameters(updateLocation(myParamt.x, myParamt.y))
}

function changeParam(){
    clearRect(fieldStartsX, fieldStartsY, fieldHeigth, fieldWidth)
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

function getColor(){
    return color = colorPicker.value;
}
function getSize(){
    return size = range.value;
}

function renderBall(element){
    ctx.fillStyle = element.color;
    ctx.beginPath();
    ctx.arc(element.x, element.y, element.size, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}

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
    clearRect(fieldStartsX, fieldStartsY, fieldHeigth, fieldWidth)
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
    clearRect(fieldStartsX, fieldStartsY, fieldHeigth, fieldWidth)
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