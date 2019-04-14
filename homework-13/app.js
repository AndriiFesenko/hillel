'use strict'
function Accordion(el, config){
    this.el = el;
    this.config = config;
    this.element = el.getElementsByClassName('accordeon-body');
    el.addEventListener('click', openBody)
}

function openBody(e){

    if(e.target.getAttribute('index') 
        === e.target.nextElementSibling.getAttribute('index')){
        e.target.nextElementSibling.classList.toggle('accordeon-body-showed');
    }
}

Accordion.prototype.setIndex = function(){
    this.accordeonBody = this.el.getElementsByClassName('accordeon-body');
        for(let i=0; i<this.accordeonBody.length; i++){
            this.accordeonBody[i].setAttribute('index', i);
        }
    this.accordeonHeader = this.el.getElementsByClassName('accordeon-heading');
        for(let i=0; i<this.accordeonHeader.length; i++){
            this.accordeonHeader[i].setAttribute('index', i);
        }
}


Accordion.prototype.open = function(e) {
    this.removeOtherCollapse();
    if(this.element[e].className === 'accordeon-body'){
        this.element[e].classList.add('accordeon-body-showed');
    }
}

Accordion.prototype.close = function(e) {
    if(this.element[e].classList.contains('accordeon-body-showed')){
        this.element[e].classList.remove('accordeon-body-showed');
    }
}

Accordion.prototype.toggle = function(e){
    this.element[e].classList.toggle('accordeon-body-showed');
}

Accordion.prototype.removeOtherCollapse = function(){
    for(let i=0; i<this.element.length; i++){
        if(this.config.collapseOther){
            this.element[i].classList.remove('accordeon-body-showed');
        }
    }
}


const accordion = new Accordion(
                        document.getElementById('container'),
                        {collapseOther: true}
                    );



accordion.setIndex();


// accordion.open(0);
// accordion.close(0);
// accordion.toggle(1);



















