let urlWeakMap = new WeakMap;

export default class ToDoModel {
    get url() {
        return urlWeakMap.get(this);
    }

    set url(val) {
        urlWeakMap.set(this, val);
    }

    constructor(tasksUrl) {
        this.url = tasksUrl;
    }


    changeData(element) {
        return fetch(`${this.url}/${element.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        })
    }
    
    create(taskInfo) {
        return fetch(this.url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        }).then((response) => response);
    }

    delete(id) {
        return fetch(`${this.url}/${id}`, {
            method: "DELETE",
        }).then((response) => response)
    }
}