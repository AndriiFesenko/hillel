
import $ from 'jquery';

export default class toDoView {
    constructor(tbody){
        this.$el = $(tbody);

        this.onElementClick = this.onElementClick.bind(this);

        this.$el.on('click', 'tr', this.onElementClick)
    }

    onElementClick(event) {
        const id = $(event.target).parents('tr').attr('data-user-id');
        console.log(id, $(this))
        if(event.target.value === 'delete'){
            this.onDeleteBttnClick(id)
        }
    }
    render(data) {
        let userTemplate = document.getElementById('userTemplate').innerHTML
        let userList = data.map((current) => {
            return userTemplate
                        .replace('{{id}}', current.id)
                        .replace('{{name}}', current.name)
                        .replace('{{surname}}', current.surname)
                        .replace('{{email}}', current.email)
                        .replace('{{phone}}', current.phone)
        })
        this.$el.html(userList)
    }
}