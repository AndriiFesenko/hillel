
let url = new WeakMap;
export default class ToDoModel{
    get url(){
        return url.get(this)
    }
    set url(val){
        url.set(this, val)
    }
    constructor(url, data) {
        this.url = url;
        Object.assign(this, data)
        console.log('model constructor');
    }

    save(){
        if (this.id){
            this.update();
        } else {
            // this.create();
        }
    }

    update(){
        fetch(`${this.url}/${this.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this)
            }
        )
    }
    deleteUser(id){
        fetch(`${this.url}/${id}`, {
            method: "DELETE"
        })
    }
}