
export class Cart {
    
    constructor(productsArr) {

        this.productsArr = productsArr;
        this.cartProductsArr = [];

        this.nav = document.querySelector('nav');
        this.products = document.querySelector('.products');
    }
    
    addStuffToCartArr(product) {
         // проверяем есть ли такой елемент в корзине 
        if(this.findElement(product)){
            // если есть, то не добавляем
            return
        } else {
            // Добавляем елемент по которому был клик "добавить в корзину",
            //  в массив елементов с корзины 
            this.cartProductsArr.push(product);
        }
        // показываем колличество элементов в корзине
        this.showCartItemsAmount();
    }
    findElement(element){
        return this.cartProductsArr.find((current) => current.id === element.id);
    }

    addElementsToCart(array){
        this.cartProductsArr = array;
    }
    showCart() {
        // меняем OUR PRODUCTS на YOUR CART
        this.changeTitle('YOUR CART');
        // рендерим елементы с корзины, на страницу
        this.renderProducts(this.products, this.cartProductsArr);
        // Удаляем кнопку, добавить в корзину, у элементов в корзине
        this.changeIcon();
    }

    showCartItemsAmount() {
        let cartItemsAmount = this.nav.querySelector('.search-menu > span');
        cartItemsAmount.innerHTML = `(${this.cartProductsArr.length})`
    }

    
    
    changeIcon() {
        [].forEach.call(this.products.children, (current) => {
            current.querySelector('.cartImg > img').setAttribute('id', 'delete-from-cart');
            current.querySelector('.cartImg > img').setAttribute('src', './src/img/products/delete-icon.png');
            current.querySelector('.cartImg > img').setAttribute('title', 'delete from cart');

        })
    }
    
}