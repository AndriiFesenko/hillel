import ToDoModel from "../model/model";

export default class ToDoCollection{
    constructor(url, taskUrl){
        this.taskUrl = taskUrl;
        this.model = new ToDoModel(this.taskUrl);
        this.list = [];
        this.saveData = this.saveData.bind(this);
    }

    fetch(){
        return fetch(this.taskUrl)
                .then((response => response.json()))
    }
    
    findCollection(id){
        return this.list.find((element) => element.id == id);
    }
    saveData(data){
        Object.assign(this.list,data)
        return data;
    }
}