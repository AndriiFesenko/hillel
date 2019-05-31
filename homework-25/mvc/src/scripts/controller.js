import ToDoCollection from './collection';
import config from './config';
import toDoView from './view';
import ToDoModel from './model';

export default class ToDoController {
    constructor (url){
        console.log('controller')

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new toDoView('tbody');
        this.url = config.contactsUrl;
        this.model = new ToDoModel(this.url);
        this.view.onClick = (id) => {
            // return this.rename(id)
        };
        this.view.onDeleteBttnClick = (id) => {
            return this.getNewInfo(id)
        };

        this.showUserList();
    }

    rename(id){
        const model = this.collection.get(id);
    
        model.name = 'Hello world';
        model.save();
    }
    showUserList(){
        this.collection
        .fetch()
        .then((data) => { return this.view.render(data)})
    }
    getNewInfo(id){
        this.model.deleteUser(id)
        this.showUserList();
    }
}