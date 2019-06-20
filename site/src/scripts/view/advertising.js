
export class Advertising {
    constructor(){

        this.advertisingBlock = document.getElementById('advertising');

        this.renderAdvertising();
    }
    renderAdvertising(){
        this.advertisingBlock.innerHTML = 
                `<div class="advert-container">
                    <div class="wrapper-first-part">
                        <div class="text">
                            <p>FEATURED</p>
                            <p>GLASS</p>
                        </div>
                        <button>CHECK IT OUT</button>
                    </div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>`
    }
}
