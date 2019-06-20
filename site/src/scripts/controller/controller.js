
import { Content } from '../view/content';
import { Advertising } from '../view/advertising';
import {Nav} from '../view/nav';
import {Footer} from '../view/footer';
import {Model} from '../model/model'
import {Cart} from '../view/cart';
import {Section} from '../view/section';

export default class Controller {
    
    constructor() {

        
        this.Model = new Model;
        this.Advertising = new Advertising;
        this.Content = new Content;
        this.Nav = new Nav;
        this.Footer = new Footer;
        this.Cart = new Cart(this.Content.productsArr);
        this.Section = new Section;
        window.onload = this.onload();

        this.staffPick = document.querySelector('.staff-pick');

        this.Cart.renderProducts = (way, items) => this.Content.renderProducts(way, items);
        this.Cart.changeTitle = (title) => this.Content.changeTitle(title);
        this.Content.selectedProduct = (product) => this.Cart.addStuffToCartArr(product);
        this.Nav.showCart = () => this.Cart.showCart();
        this.Content.showAmount = () => this.Cart.showCartItemsAmount();
        this.Content.checkItem = (id) => this.Cart.checkItem(id);
        this.Content.sendSelectedProductToLS = (key, value) => this.Model.sendItem(key, value);
        this.Content.cartProductsArr = this.Cart.cartProductsArr;
        this.Content.deleteElementFromLS = (key) => this.Model.deleteItem(key);
        this.Content.changeIcon = () => this.Cart.changeIcon();
        this.Nav.showItemsBySex = (sex) => this.Content.showItemsBySex(sex);
        this.Nav.changeTitle = (title) => this.Content.changeTitle(title);
        this.Nav.showHomePage = () => this.Content.showHomePage();
        this.Content.showCartItemsAmount = () => this.Cart.showCartItemsAmount();
    }
    onload(){
        this.getItem();
        this.Cart.showCartItemsAmount();
    }

    getItem(){
        let array = this.Model.getItem();
        this.Cart.addElementsToCart(array);
    }
}