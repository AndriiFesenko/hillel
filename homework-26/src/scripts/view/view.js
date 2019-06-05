import $ from 'jquery';

export default class TodoView{
    constructor(){

        this.appendElement();
        this.$input = $('.wrapper-task-input').find('input[type=text]');

        this.onDeleteBtnClick = this.onDeleteBtnClick.bind(this);
        this.onAddNewTaskBtnClick = this.onAddNewTaskBtnClick.bind(this);
        this.isDone = this.isDone.bind(this);

        this.$el.on('click', '.addNewTask-btn', this.onAddNewTaskBtnClick);
        this.$el.on('click', '.deleteButton', this.onDeleteBtnClick);
        this.$el.on('click', 'li' ,this.isDone);
    }

    appendElement(){
        this.$el = $(
            `<div id="container-task-list">
                <div id="tasksList">
                </div>
                <div class="wrapper-task-input">
                    <input type="text" placeholder="type a task">
                    <input type="button" value="add new task" class="addNewTask-btn">
                </div>
            </div>`
        );

        this.$list = this.$el.find('#tasksList');

        $(document.body).append(this.$el);
    }
    isDone(event){
        let isDone;
        let id = this.getId(event.target)
        if($(event.target).parent().hasClass('true')){
            isDone = false;
        } else {
            isDone = true;
        }
        this.changeIsDone(isDone, id);
    }
    getId(el){
        return $(el).closest('div').data('taskId')
    }

    onAddNewTaskBtnClick(){
        let value = this.$input.val();
        this.newTaskValue(value);
    }

    onDeleteBtnClick(event){
        let id = this.getId(event.target);
        this.deleteTaskById(id)
    }

    render(data){
        $('#tasksList').html(
            data.map(this.replaceElements).join('\n')
        )
        this.$input.val('');
    }
    
    replaceElements(el){
        return `<div class="task-wrapper ${el.isDone}" data-task-id="${el.id}">
                    <li>${el.title}</li>
                    <input type="button" name="delete" class="deleteButton" value="delete">
                </div>`;
    }
}   

