'use strict'
let Gallery = function(el, config) {
    this.el = el;
    this.config = config;
    this.li = this.el.querySelectorAll('li');
    this.el.addEventListener('click', this.changeImg.bind(this));
    
}

Gallery.prototype.changeImg = function(e){
    clearInterval(this.timerId)
    this.addFirstIndex();
    this.checkButtonValue(e);
}
Gallery.prototype.addFirstIndex = function (){
    this.li[0].classList.add('showed');
    this.getIndex();
}
Gallery.prototype.checkButtonValue = function (e) {
    let value = e.target.getAttribute('value');
    if(value === 'Next'){
        this.next();
    } else if (value === 'Prev') {
        this.prev();
    }
}

Gallery.prototype.next = function () {
    this.addFirstIndex();
    this.li[this.index].classList.remove('showed');
    this.li[this.index].nextElementSibling.classList.add('showed');
        
}

Gallery.prototype.getIndex = function(index) {
    for(let i=0; i<this.li.length; i++){
        if(this.li[i].classList.contains('showed')){
            index = i;
            this.index = index;
        }  
    }
}

Gallery.prototype.prev = function() {
    this.addFirstIndex();
    if(this.index === 0){
       this.index = this.li.length - 1;
    }
    this.li[this.index].classList.remove('showed');
    this.li[this.index - 1].classList.add('showed');
    
}

Gallery.prototype.show = function(el){
    this.li[0].classList.add('showed');
    this.getIndex();
    this.li[this.index].classList.toggle('showed');
    this.li[el].classList.add('showed');
}

Gallery.prototype.interval = function() {
    this.timerId = setInterval(myGallery.next.bind(myGallery), this.config.delay);
}
const myGallery = new Gallery(document.getElementById('container'),
                                { delay: 1000}
                                )


myGallery.interval();

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();



    