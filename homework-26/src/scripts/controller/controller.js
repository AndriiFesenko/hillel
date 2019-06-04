
import '../../styles/list.css';
import ToDoCollection from '../model/collection';
import config from '../config';
import TodoView from '../view/view';
import ContactModal from '../view/modal';
import ToDoModel from '../model/model';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl, config.tasksUrl);
        this.view = new TodoView();
        this.modal = new ContactModal();
        this.model = new ToDoModel(config.tasksUrl);

        
        this.list = [];
        this.saveData = this.saveData.bind(this);
        this.renderData = this.renderData.bind(this);

        this.view.newTaskValue = (value) => this.setNewTask(value);
        this.view.taskId = (id) => this.deleteTask(id);
        this.view.changeIsDone = (isDone, id) => this.changeIsDone(isDone, id);

        this.collection
            .fetch()
            .then(this.saveData)
            .then(this.renderData);

    }
    saveData(data){
        Object.assign(this.list,data)
        return data;
    }
    setNewTask(value){
        let body = {
            title: value,
            isDone: false
        }
        this.model.create(body).then((response) => {
            this.updateList(response);
        })
    }
    renderData(tasks){
        this.view.render(tasks)
    }
    deleteTask(id){
        this.model.delete(id).then((response) => {
            this.updateList(response);
        })
    }
    changeIsDone(oppositeIsDone, id){
        let element = this.findCollection(id);
        element.isDone = oppositeIsDone;
        this.updateElementInfo(element);
    }
    findCollection(id){
        return this.list.find((element) => element.id == id);
    }
    updateElementInfo(element){
        this.model.changeData(element).then(response => {
            this.updateList(response);
        })
    }
    updateList(response){
        if(response.ok){
            this.collection.fetch()
            .then(this.saveData)
            .then(this.renderData)
        }
    }
}