
import '../../styles/list.css';
import ToDoCollection from '../model/collection';
import config from '../config';
import TodoView from '../view/view';
import ToDoModel from '../model/model';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl, config.tasksUrl);
        this.view = new TodoView();
        this.model = new ToDoModel(config.tasksUrl);

        
        this.renderData = this.renderData.bind(this);

        this.view.newTaskValue = (value) => this.setNewTask(value);
        this.view.deleteTaskById = (id) => this.deleteTask(id);
        this.view.changeIsDone = (isDone, id) => this.changeIsDone(isDone, id);

        this.collection
            .fetch()
            .then(this.collection.saveData)
            .then(this.renderData);

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
        let element = this.collection.findCollection(id);
        element.isDone = oppositeIsDone;
        this.updateElementInfo(element);
    }
    updateElementInfo(element){
        this.model.changeData(element).then(response => {
            this.updateList(response);
        })
    }
    updateList(response){
        if(response.ok){
            this.collection.fetch()
            .then(this.collection.saveData)
            .then(this.renderData)
        }
    }
}