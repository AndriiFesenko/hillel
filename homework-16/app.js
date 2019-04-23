class Tabset{
    static TABSET_CONTAINER = 'tabset-container';
    static TABSET_ELEMENT = 'tabset-element';
    
    constructor (container){
        this.container = container;
        this.tabsetElement = this.container.getElementsByClassName(Tabset.TABSET_ELEMENT);
        this.container.addEventListener('click', this.showElementByClick.bind(this));
        this.init();
    }
    init(){
        this.container.classList.add(Tabset.TABSET_CONTAINER);
        this.show(0);
    }
    showElementByClick(e){
        if(e.target.parentNode.classList.contains('tabset-element')){
            this.hideElemetns();
            e.target.parentNode.classList.add('show');
        }
    }
    hideElemetns() {
        this.changeClass(this.tabsetElement);
    }
    changeClass(element){
        for(let i=0; i<element.length; i++){
            element[i].classList.add('hide');
            element[i].classList.remove('show');
        }
    }
    show(index){
        this.hideElemetns();
        this.tabsetElement[index].classList.add('show');
    }
    next(){
        this.setIndex();
        this.nextElement(this.tabsetElement);
    }
    setIndex(){
        this.setIndexForElement(this.tabsetElement); 
    }
    setIndexForElement(element){
        let index;
        for(let i=0; i<element.length; i++){
            if(element[i].classList.contains('show')){
                index = i;
                this.index = index;
            }
        }
    }
    nextElement(element){
        if(this.index === element.length - 1){
            this.show(0);
        }
        if(element[this.index].classList.contains('show')){
            element[this.index+1].classList.add('show');
            element[this.index].classList.remove('show');
        }
    
}
}

const tabs = new Tabset(
                        document.getElementById('container')
                    );