
export class Section{
    constructor() {

        this.background = ["url(./src/img/background1.gif", 
                            "url(./src/img/background2.gif",
                            "url(./src/img/background3.gif"];  
        this.count = 0;

        this.section = document.querySelector('section');
        this.leftBtn = document.getElementById('leftButton');
        this.rightBtn = document.getElementById('rightButton');

        this.setAnimation();
        this.section.addEventListener('click', (e) => this.onSectionClick(e))
    }
    onSectionClick(e){
        if(e.target === this.leftBtn){
            this.moveLeft();
        } else if(e.target === this.rightBtn) {
            this.moveRight();
        }
    }
    setAnimation(){
        setInterval(() => {
            this.moveLeft()
        }, 4000)
    }
    moveLeft(){
        this.section.style.transition = '3s';
        this.count--
        if(this.count < 0){
            this.count = 2;
        }
        this.section.style.backgroundImage = this.background[this.count];
    }
    moveRight(){
        this.section.style.backgroundImage = this.background[this.count];
        this.section.style.opacity = 0;
        this.count++
        if(this.count >= 3){
            this.count = 0;
        }
        this.section.style.opacity = 1;
        this.section.style.backgroundImage = this.background[this.count]
    }
}