const ul = document.getElementById('ul');
const button = document.getElementById('button');
button.addEventListener('click', createElement);

function createElement() {
    let li = document.createElement('li');
    li.innerHTML = "NewLiElement"; 
    ul.appendChild(li).classList.add('liElem');

    li.addEventListener('click', toggleFunctions);  
    
}

// Узнать почему мы здесь передаем переменную (e) 
// и где мы ее используем и куда она записывается 
// при выходе из функции 
function toggleFunctions(e){
    changeColor(e);
    keyboardEvent(e)
}

function changeColor(e) {
    e.target.style.background = 
    e.target.style.background == 'yellow' ?
                'red' : 'yellow';
}


// если не указать (e) пишет e is not defined 
// спросить что такое е и почему e.target 
function keyboardEvent(e) {
    if(e.altKey) {
        e.target.parentNode.removeChild(e.target);
    }
}


