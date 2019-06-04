import ToDoModel from "../model/model";

export default class ToDoCollection{
    constructor(url, taskUrl){
        this.taskUrl = taskUrl;
        this.model = new ToDoModel(this.taskUrl);
    }

    fetch(){
        return fetch(this.taskUrl)
                .then((response => response.json()))
    }
    delete(id){
        console.log(id, ' from collection')
        this.model.delete(id);
        return Promise.resolve();
    }
}