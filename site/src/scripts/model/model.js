
export class Model{
    constructor() {
        
    }
    sendItem(productKey, product){
        localStorage.setItem(productKey, JSON.stringify(product));
    }
    getItem(){
        let keys = Object.keys(localStorage);
        return keys.map((current) => {
            if(current.includes('product')){
                return JSON.parse(localStorage.getItem(current))
            }
        })
    }
    deleteItem(key){
        localStorage.removeItem(key)
    }
}