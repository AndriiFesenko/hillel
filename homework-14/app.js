'use strict'
class Gallery {
    constructor (el, config){
        this.el = el;
        this.config = config;
        this.li = this.el.querySelectorAll('li');
        this.el.addEventListener('click', this.changeImg.bind(this));
        
    }
    addButton(){
        //------add left button------
        this.leftButton = document.createElement('input');
        this.el.insertBefore(this.leftButton, this.el.querySelector('li'))
        this.leftButton.setAttribute('value', 'Prev');
        this.leftButton.setAttribute('class', 'prev');
        this.leftButton.setAttribute('type', 'button');
        //--------add right button------
        this.rightButton = document.createElement('input');
        this.el.appendChild(this.rightButton);
        this.rightButton.setAttribute('value', 'Next');
        this.rightButton.setAttribute('class', 'next');
        this.rightButton.setAttribute('type', 'button');

    }
    changeImg(e) {
        clearInterval(this.timerId)
        this.checkButtonValue(e);
    }
    addFirstIndex() {
        this.li[0].classList.add('showed');
    }
    checkButtonValue(e) {
        let value = e.target.getAttribute('value');
        if(value === 'Next'){
            this.next();
        } else if (value === 'Prev') {
            this.prev();
        }
    }
    next() {
        this.setIndex();
        if(this.index === this.li.length - 1) {
            this.li[0].classList.add('showed');
        }
        this.li[this.index].classList.remove('showed');
        this.li[this.index].nextElementSibling.classList.add('showed');
            
    }
    setIndex(index) {
        for(let i=0; i<this.li.length; i++){
            if(this.li[i].classList.contains('showed')){
                index = i;
                this.index = index;
            }  
        }
    }
    prev() {
        this.setIndex();
        if(this.index === 0){
           this.index = this.li.length - 1;
        }
        this.li[this.index].classList.remove('showed');
        this.li[this.index - 1].classList.add('showed');
        
    }
    show(el){
        this.li[0].classList.add('showed');
        this.setIndex();
        this.li[this.index].classList.toggle('showed');
        this.li[el].classList.add('showed');
    }
    interval() {
        this.timerId = setInterval(myGallery.next.bind(myGallery), this.config.delay);
    }
}



const myGallery = new Gallery(document.getElementById('container'),
                                { delay: 1000}
                                )

myGallery.addFirstIndex();
myGallery.addButton();
myGallery.interval();

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();




