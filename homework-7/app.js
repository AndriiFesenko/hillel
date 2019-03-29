const userName = prompt('Write your name');
document.getElementById('firsth1').innerHTML+=userName;


let counter = 0;

function getUserNumber() {
    let userNumber = prompt('Type a number from 0 to 100');
    
    if (!validateUserNumber(userNumber)) {
        for (i=0; i<userNumber; i++) {
            counter++;
            creatingNewEl();
        }
    } else {
        alert('you wrote wrong type. Please type a number from 0 to 100');
        fun1();
    }
}

function creatingNewEl() {
    const newElem = document.createElement('li');
    document.body.appendChild(newElem);
    newElem.textContent = counter;
}

function validateUserNumber(value){
    return  (isNaN(value) 
            || value == ' ' 
            || value == null
            || value == '' 
            || value > 100
            || value < 10);
}

fun1();