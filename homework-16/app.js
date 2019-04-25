class Tabset{
    static TABSET_CONTAINER = 'tabset-container';
    static TABSET_ELEMENT = 'tabset-element';
    
    constructor (container){
        this.container = container;
        this.tabsetElements = this.container.getElementsByClassName(Tabset.TABSET_ELEMENT);
        this.container.addEventListener('click', this.showElementByClick.bind(this));
        this.init();
    }
    init(){
        this.container.classList.add(Tabset.TABSET_CONTAINER);
        this.show(0);
    }
    showElementByClick(e){
        if(e.target.parentNode.classList.contains('tabset-element')){
            this.hideElements();
            e.target.parentNode.classList.add('show');
        }
    }
    hideElements() {
        this.hideThisElement();
    }
    hideThisElement(){
        for(let i=0; i<this.tabsetElements.length; i++){
            this.tabsetElements[i].classList.remove('show');
        }
    }
    show(index){
        if(index === undefined){
            if(this.index === this.tabsetElements.length - 1){
                this.show(0);
            }
            if(this.tabsetElements[this.index].classList.contains('show')){
                this.tabsetElements[this.index+1].classList.add('show');
                this.tabsetElements[this.index].classList.remove('show');
            }
        } else {
            this.hideElements();
            this.tabsetElements[index].classList.add('show');
        }
    }
    next(){
        this.setIndex();
        this.show();
    }
    setIndex(){
        let element = this.tabsetElements;
        let indexOfElement;
        Array.from(element).reduce(function(previous,current,index,arr){
            if(element[index].classList.contains('show')){
                return indexOfElement = index;
            }
        }, 0);
        this.index = indexOfElement;
    }
}

const tabs = new Tabset(
                        document.getElementById('container')
                    );