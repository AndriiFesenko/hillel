
export class Nav {
    
    constructor(productsArr) {
        this.productsArr = productsArr;
        
        this.nav = document.querySelector('nav');
        this.products = document.querySelector('.products');
        this.checkBox = document.getElementById('site-menu');
        this.menu = document.querySelector('.header-menu');

        window.onload = this.onload();

        this.cartProductsArr = [];
        
        this.nav.addEventListener('click', (e) => this.onNavClick(e));
        this.checkBox.addEventListener('click', () => this.changeStatusMenu())
    }
    
    onNavClick(e) {
        if (e.target.id === 'cart') {
            this.showCart();
        } else if (e.target.innerHTML === 'WOMEN'){
            let sex = 'WOMEN'
            this.changeTitle(sex)
            this.showItemsBySex(sex);
        } else if (e.target.innerHTML === 'MEN'){
            let sex = 'MEN'
            this.changeTitle(sex)
            this.showItemsBySex(sex);
        } else if (e.target.innerHTML === 'HOME') {
            this.changeTitle('FEATURED PRODUCTS')
            this.showHomePage();
        }
    }
    onload(){
        // this.menu.style.display = 'none'
        // this.menu.classList.add('hide')
    }
    changeStatusMenu(){
        if(!this.checkBox.checked){
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }
    hideMenu(){
        this.menu.classList.remove('show')
    }
    showMenu(){
        this.menu.classList.add('show');
    }
}