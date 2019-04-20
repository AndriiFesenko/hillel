    
class Album{
    static CONTAINER_CLASS = 'album-container';
    static ITEM_CLASS = 'album-item';

    constructor (ul){
        this.ul = ul;
        this.li = ul.querySelectorAll('li');
        this.ul.addEventListener('mouseover', this.addElement.bind(this));
        this.ul.addEventListener('mouseout', this.deleteElement.bind(this));
        this.init();
    }
    init(){
        this.applyClasses();
        this.addMainImg();
    }
    applyClasses(){
        this.ul.classList.add(Album.CONTAINER_CLASS);
        this.li.forEach((current, index, arr) =>{
        this.li[index].classList.add(Album.ITEM_CLASS)
        });
    }
    addMainImg() {
        this.div = document.createElement('div');
        this.div.setAttribute('class', 'album-div');
        document.body.insertBefore(this.div, this.ul);
    }
    
    addElement(e) {
        if(e.target.parentNode.classList.contains('album-item')){
            this.parentElementofImg = e.target.parentNode;
            let cloneElement = this.parentElementofImg.cloneNode( true );
            this.div.appendChild(cloneElement);
        }
    }
    
    deleteElement(e){
        if(e.target.parentNode.classList.contains('album-item')){
            if(this.div.children.length > 1) {
                this.div.removeChild(this.div.lastChild.previousElementSibling);
            }
        }
    }

}

const album = new Album(document.getElementById('container'));
