
export default class ToDoCollection {
    constructor(url){
        this.url = url;
        this.list = [];
    }
    fetch(){
        return fetch(this.url)
                .then((response => response.json()))
    }
    get(id){
        return this.list.find((el) => {return el.id == id})
    }
}