import ToDoCollection from './collection';
import config from './config';
import toDoView from './view';
import ToDoModel from './model';

export default class ToDoController {
    constructor (url){
        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new toDoView('tbody');
        this.url = config.contactsUrl;
        this.model = new ToDoModel(this.url);
        
        this.view.onDeleteBttnClick = (id) => {
            return this.delete(id)
        };

        this.showUserList();
    }
    showUserList(){
        this.collection
        .fetch()
        .then((data) => { return this.view.render(data)})
    }
    delete(id){
        this.model.deleteElement(id).then((data) => {
            if(data.status === 200){
                this.showUserList();
            }
        });
        
    }
}