const ul = document.getElementById('ul');
const button = document.getElementById('button');
button.addEventListener('click', createElement);

function createElement() {
    let li = document.createElement('li');
    li.innerHTML = "NewLiElement"; 
    ul.appendChild(li).classList.add('liElem');

    li.addEventListener('click', toggleFunctions);  
    
}

function toggleFunctions(e){
    changeColor(e);
    keyboardEvent(e)
}

function changeColor(e) {
    e.target.style.background = 
    e.target.style.background == 'yellow' ?
                'red' : 'yellow';
}

function keyboardEvent(e) {
    if(e.altKey) {
        e.target.parentNode.removeChild(e.target);
    }
}


