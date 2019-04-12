'use strict'
function Accordion(el, config){
    this.config = config;
    this.element = el.getElementsByClassName('accordeon-body');
}

Accordion.prototype.open = function(e) {
    this.isCollapseOtherTrue();
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

Accordion.prototype.isCollapseOtherTrue = function(){
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




















