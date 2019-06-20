export class Content {
    
    constructor() {

        this.productsArr = [
            {
                img: './src/img/products/Layer-14.gif',
                name: 'Lorem ipsum is simply.',
                price: '$388.00',
                imgUrl: './src/img/products/Layer-5.gif',
                isNew: true,
                sex: 'WOMEN'
            },
            {
                img: './src/img/products/Layer-15.gif',
                name: 'Nulamer sumersoit.',
                price: '$90.00',
                imgUrl: './src/img/products/Layer-5.gif',
                sex: 'MEN'
            },
            {
                img: './src/img/products/Layer-16.gif',
                name:'Deco La meru',
                price: '$460',
                imgUrl: './src/img/products/Layer-5.gif',
                sale: '$300.00',
                sex: 'WOMEN'
            },
            {
                img: './src/img/products/Layer-17.gif',
                name:'Omnis saepe',
                price: '$180.00',
                imgUrl: './src/img/products/Layer-5.gif',
                sex: 'MEN'
            },
            {
                img: './src/img/products/Layer-18.gif',
                name:'voluptates expedita.',
                price: '$278.00',
                imgUrl: './src/img/products/Layer-5.gif',
                isNew: true,
                sex: 'MEN'
            },
            {
                img: './src/img/products/Layer-19.gif',
                name:'reiciendis unde.',
                price: '$378.00',
                imgUrl: './src/img/products/Layer-5.gif',
                sex: 'WOMEN'
            },
            {
                img: './src/img/products/Layer-20.gif',
                name:'similique distinctio.',
                price: '$500.00',
                imgUrl: './src/img/products/Layer-5.gif',
                isNew: true,
                sex: 'WOMEN'
            },
            {
                img: './src/img/products/Layer-21.gif',
                name:'laboriosam vero.',
                price: '$460',
                imgUrl: './src/img/products/Layer-5.gif',
                sale: '$200.00',
                sex: 'WOMEN'
            },
            {
                img: './src/img/products/Layer-22.gif',
                name:'doloribus at laudantium.',
                price: '$370.00',
                imgUrl: './src/img/products/Layer-5.gif',
                isNew: true,
                sex: 'MEN'
            }
        ];
        this.content = document.getElementById('content');
        this.newProducts = document.querySelector('.new-products');
        this.products = document.querySelector('.products');
        this.showHomePage();

        this.renderNewProducts();
        this.setAnimation();  // слайд анимация новых элементов for NewProducts

        this.content.addEventListener('click', (e) => this.onButtonClick(e));

    }
    onButtonClick(e){
        if(e.target.id === 'add-to-cart') {
            this.addItemToCart(e);
        } else if (e.target.id === 'delete-from-cart') {
            this.deleteElement(e);
        }
    }
    showHomePage(){
        this.renderProducts(this.products, this.productsArr)
    }
    renderProducts(way, element) {
        way.innerHTML = element.map((current) => {
            current.id = 'product' + current.name;
            if(current.sale){

                let label = '<div class="label-sale">SALE</div>';
                let currentPrice = `<span>${current.price}</span><p>${current.sale}</p>`;
                return this.template(current, label, currentPrice)

            } else if (current.isNew){

                let label = '<div class="label-new">NEW</div>';
                let currentPrice = `<p>${current.price}</p>`;
                return this.template(current, label, currentPrice);

            } else {

                let label = '';
                let currentPrice = `<p>${current.price}</p>`;
                return this.template(current, label, currentPrice);

            }    
        }).join('');
    }
    renderNewProducts() {
        let newProductsArr = this.productsArr.map((current) => {
            if(current.isNew){
                let label = '<div class="label-new">NEW</div>';
                let currentPrice = `<p>${current.price}</p>`;
                return this.template(current, label, currentPrice);
            }
        }).join('')
        this.newProducts.innerHTML =  newProductsArr;
        
    }

    setAnimation(){
        setInterval(() => {
            this.moveElement();
        }, 5000)
    }
    moveElement(){
        let lastChild = this.newProducts.lastElementChild;
        this.newProducts.lastElementChild.remove();
        this.newProducts.insertBefore(lastChild, this.newProducts.firstElementChild);
    }

    template(current, label, currentPrice){
        return `<div class="product-wrapper" data-id="${current.id}">
                    ${label}
                    <div class="product-img">
                        <img src="${current.img}">
                    </div>
                    <div class="description-wrap">
                        <div class="description">
                            <h2>${current.name}</h2>
                                ${currentPrice}
                        </div>
                        <div class="cartImg">
                            <img src="${current.imgUrl}" title="Add to cart" id="add-to-cart">
                        </div>
                    </div>
                </div>`
    }

    changeTitle(title){
        let h2 = this.content.querySelector('h2');
        h2.innerHTML = title;
    }
    addItemToCart(e){
        const element = e.target.parentNode.parentNode.parentNode;
        // Ищем елемент по которому был клик "добавить в корзину"
        let product = this.findElement(element.dataset);
        // отправляем продукт в массив корзины
        this.selectedProduct(product);
        this.sendSelectedProductToLS(product.id, product);
    }
    findElement(element){
        return this.productsArr.find((current) => current.id === element.id);
    }
    findIndexofElement(product){
        return this.cartProductsArr.findIndex((current) => current.id === product.id)
    }
    deleteElement(e) {
        const element = e.target.parentNode.parentNode.parentNode;
        // ищем элемент по которому был клик 
        let product = this.findElement(element.dataset);
        // ищем индекс элемента в корзине, по которому был клик 
        let index = this.findIndexofElement(product);
        // удаляем элемент массива корзины
        this.cartProductsArr.splice(index, 1);
        // удаляем элемент с local storage 
        this.deleteElementFromLS(product.id);
        // Делаем новый перерендер элементов после удаления элемента в массиве
        this.renderProducts(this.products, this.cartProductsArr);
        // меняем иконки добавления на иконки удаления
        this.changeIcon();
        this.showCartItemsAmount();
    }
    showItemsBySex(sex){
        let arr = []
        this.productsArr.map((current) => {
            if(current.sex === sex){
                arr.push(current)
            }
        })
        this.renderProducts(this.products, arr)
    }
}

