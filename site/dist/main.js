!function(t){var e={};function r(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);class i{constructor(){this.productsArr=[{img:"./src/img/products/Layer-14.gif",name:"Lorem ipsum is simply.",price:"$388.00",imgUrl:"./src/img/products/Layer-5.gif",isNew:!0,sex:"WOMEN"},{img:"./src/img/products/Layer-15.gif",name:"Nulamer sumersoit.",price:"$90.00",imgUrl:"./src/img/products/Layer-5.gif",sex:"MEN"},{img:"./src/img/products/Layer-16.gif",name:"Deco La meru",price:"$460",imgUrl:"./src/img/products/Layer-5.gif",sale:"$300.00",sex:"WOMEN"},{img:"./src/img/products/Layer-17.gif",name:"Omnis saepe",price:"$180.00",imgUrl:"./src/img/products/Layer-5.gif",sex:"MEN"},{img:"./src/img/products/Layer-18.gif",name:"voluptates expedita.",price:"$278.00",imgUrl:"./src/img/products/Layer-5.gif",isNew:!0,sex:"MEN"},{img:"./src/img/products/Layer-19.gif",name:"reiciendis unde.",price:"$378.00",imgUrl:"./src/img/products/Layer-5.gif",sex:"WOMEN"},{img:"./src/img/products/Layer-20.gif",name:"similique distinctio.",price:"$500.00",imgUrl:"./src/img/products/Layer-5.gif",isNew:!0,sex:"WOMEN"},{img:"./src/img/products/Layer-21.gif",name:"laboriosam vero.",price:"$460",imgUrl:"./src/img/products/Layer-5.gif",sale:"$200.00",sex:"WOMEN"},{img:"./src/img/products/Layer-22.gif",name:"doloribus at laudantium.",price:"$370.00",imgUrl:"./src/img/products/Layer-5.gif",isNew:!0,sex:"MEN"}],this.content=document.getElementById("content"),this.newProducts=document.querySelector(".new-products"),this.products=document.querySelector(".products"),this.showHomePage(),this.renderNewProducts(),this.setAnimation(),this.content.addEventListener("click",t=>this.onButtonClick(t))}onButtonClick(t){"add-to-cart"===t.target.id?this.addItemToCart(t):"delete-from-cart"===t.target.id&&this.deleteElement(t)}showHomePage(){this.renderProducts(this.products,this.productsArr)}renderProducts(t,e){t.innerHTML=e.map(t=>{if(t.id="product"+t.name,t.sale){let e='<div class="label-sale">SALE</div>',r=`<span>${t.price}</span><p>${t.sale}</p>`;return this.template(t,e,r)}if(t.isNew){let e='<div class="label-new">NEW</div>',r=`<p>${t.price}</p>`;return this.template(t,e,r)}{let e="",r=`<p>${t.price}</p>`;return this.template(t,e,r)}}).join("")}renderNewProducts(){let t=this.productsArr.map(t=>{if(t.isNew){let e='<div class="label-new">NEW</div>',r=`<p>${t.price}</p>`;return this.template(t,e,r)}}).join("");this.newProducts.innerHTML=t}setAnimation(){setInterval(()=>{this.moveElement()},5e3)}moveElement(){let t=this.newProducts.lastElementChild;this.newProducts.lastElementChild.remove(),this.newProducts.insertBefore(t,this.newProducts.firstElementChild)}template(t,e,r){return`<div class="product-wrapper" data-id="${t.id}">\n                    ${e}\n                    <div class="product-img">\n                        <img src="${t.img}">\n                    </div>\n                    <div class="description-wrap">\n                        <div class="description">\n                            <h2>${t.name}</h2>\n                                ${r}\n                        </div>\n                        <div class="cartImg">\n                            <img src="${t.imgUrl}" title="Add to cart" id="add-to-cart">\n                        </div>\n                    </div>\n                </div>`}changeTitle(t){this.content.querySelector("h2").innerHTML=t}addItemToCart(t){const e=t.target.parentNode.parentNode.parentNode;let r=this.findElement(e.dataset);this.selectedProduct(r),this.sendSelectedProductToLS(r.id,r)}findElement(t){return this.productsArr.find(e=>e.id===t.id)}findIndexofElement(t){return this.cartProductsArr.findIndex(e=>e.id===t.id)}deleteElement(t){const e=t.target.parentNode.parentNode.parentNode;let r=this.findElement(e.dataset),i=this.findIndexofElement(r);this.cartProductsArr.splice(i,1),this.deleteElementFromLS(r.id),this.renderProducts(this.products,this.cartProductsArr),this.changeIcon(),this.showCartItemsAmount()}showItemsBySex(t){let e=[];this.productsArr.map(r=>{r.sex===t&&e.push(r)}),this.renderProducts(this.products,e)}}class s{constructor(){this.advertisingBlock=document.getElementById("advertising"),this.renderAdvertising()}renderAdvertising(){this.advertisingBlock.innerHTML='<div class="advert-container">\n                    <div class="wrapper-first-part">\n                        <div class="text">\n                            <p>FEATURED</p>\n                            <p>GLASS</p>\n                        </div>\n                        <button>CHECK IT OUT</button>\n                    </div>\n                    <ul>\n                        <li></li>\n                        <li></li>\n                        <li></li>\n                    </ul>\n                </div>'}}class n{constructor(t){this.productsArr=t,this.nav=document.querySelector("nav"),this.products=document.querySelector(".products"),this.checkBox=document.getElementById("site-menu"),this.menu=document.querySelector(".header-menu"),window.onload=this.onload(),this.cartProductsArr=[],this.nav.addEventListener("click",t=>this.onNavClick(t)),this.checkBox.addEventListener("click",()=>this.hideMenu())}onNavClick(t){if("cart"===t.target.id)this.showCart();else if("WOMEN"===t.target.innerHTML){let t="WOMEN";this.changeTitle(t),this.showItemsBySex(t)}else if("MEN"===t.target.innerHTML){let t="MEN";this.changeTitle(t),this.showItemsBySex(t)}else"HOME"===t.target.innerHTML&&(this.changeTitle("FEATURED PRODUCTS"),this.showHomePage())}onload(){}hideMenu(){this.checkBox.checked?this.menu.classList.add("show"):this.menu.classList.remove("show")}}class o{constructor(){this.usersArr=[{img:"./src/img/footer/Layer-36.gif"},{img:"./src/img/footer/Layer-37.gif"},{img:"./src/img/footer/Layer-38.gif"},{img:"./src/img/footer/Layer-39.gif"},{img:"./src/img/footer/Layer-39.gif"},{img:"./src/img/footer/Layer-38.gif"},{img:"./src/img/footer/Layer-37.gif"},{img:"./src/img/footer/Layer-36.gif"}],this.userImgBlock=document.querySelector(".users-img-block"),this.renderUsersImg()}renderUsersImg(){this.userImgBlock.innerHTML=this.usersArr.map(t=>`<img src="${t.img}">`).join("")}}class c{constructor(){}sendItem(t,e){localStorage.setItem(t,JSON.stringify(e))}getItem(){return Object.keys(localStorage).map(t=>{if(t.includes("product"))return JSON.parse(localStorage.getItem(t))})}deleteItem(t){localStorage.removeItem(t)}}class a{constructor(t){this.productsArr=t,this.cartProductsArr=[],this.nav=document.querySelector("nav"),this.products=document.querySelector(".products")}addStuffToCartArr(t){this.findElement(t)||(this.cartProductsArr.push(t),this.showCartItemsAmount())}findElement(t){return this.cartProductsArr.find(e=>e.id===t.id)}addElementsToCart(t){this.cartProductsArr=t}showCart(){this.changeTitle("YOUR CART"),this.renderProducts(this.products,this.cartProductsArr),this.changeIcon()}showCartItemsAmount(){this.nav.querySelector(".search-menu > span").innerHTML=`(${this.cartProductsArr.length})`}changeIcon(){[].forEach.call(this.products.children,t=>{t.querySelector(".cartImg > img").setAttribute("id","delete-from-cart"),t.querySelector(".cartImg > img").setAttribute("src","./src/img/products/delete-icon.png"),t.querySelector(".cartImg > img").setAttribute("title","delete from cart")})}}class d{constructor(){this.background=["url(./src/img/background1.gif","url(./src/img/background2.gif","url(./src/img/background3.gif"],this.count=0,this.section=document.querySelector("section"),this.leftBtn=document.getElementById("leftButton"),this.rightBtn=document.getElementById("rightButton"),this.setAnimation(),this.section.addEventListener("click",t=>this.onSectionClick(t))}onSectionClick(t){t.target===this.leftBtn?this.moveLeft():t.target===this.rightBtn&&this.moveRight()}setAnimation(){setInterval(()=>{this.moveLeft()},4e3)}moveLeft(){this.section.style.transition="3s",this.count--,this.count<0&&(this.count=2),this.section.style.backgroundImage=this.background[this.count]}moveRight(){this.section.style.backgroundImage=this.background[this.count],this.section.style.opacity=0,this.count++,this.count>=3&&(this.count=0),this.section.style.opacity=1,this.section.style.backgroundImage=this.background[this.count]}}new class{constructor(){this.Model=new c,this.Advertising=new s,this.Content=new i,this.Nav=new n,this.Footer=new o,this.Cart=new a(this.Content.productsArr),this.Section=new d,window.onload=this.onload(),this.staffPick=document.querySelector(".staff-pick"),this.Cart.renderProducts=(t,e)=>this.Content.renderProducts(t,e),this.Cart.changeTitle=t=>this.Content.changeTitle(t),this.Content.selectedProduct=t=>this.Cart.addStuffToCartArr(t),this.Nav.showCart=()=>this.Cart.showCart(),this.Content.showAmount=()=>this.Cart.showCartItemsAmount(),this.Content.checkItem=t=>this.Cart.checkItem(t),this.Content.sendSelectedProductToLS=(t,e)=>this.Model.sendItem(t,e),this.Content.cartProductsArr=this.Cart.cartProductsArr,this.Content.deleteElementFromLS=t=>this.Model.deleteItem(t),this.Content.changeIcon=()=>this.Cart.changeIcon(),this.Nav.showItemsBySex=t=>this.Content.showItemsBySex(t),this.Nav.changeTitle=t=>this.Content.changeTitle(t),this.Nav.showHomePage=()=>this.Content.showHomePage(),this.Content.showCartItemsAmount=()=>this.Cart.showCartItemsAmount()}onload(){this.getItem(),this.Cart.showCartItemsAmount()}getItem(){let t=this.Model.getItem();this.Cart.addElementsToCart(t)}}}]);