'use strict'
class Users {
    static URL = 'https://jsonplaceholder.typicode.com/users';
    constructor(userListTable){
        this.userTemplate = document.getElementById('userTemplate').innerHTML;
        this.tBody = userListTable.lastElementChild;
        this.init();
    }
    init(){
        request('get', Users.URL, (usersInfo) => this.showInfo(usersInfo));
    }
    showInfo(usersInfo){
        usersInfo.forEach((current) => {
            let contactTr = document.createElement('tr');
            contactTr.innerHTML = this.userTemplate
                            .replace('{{name}}', current.name)
                            .replace('{{phone}}', current.phone)
                            .replace('{{email}}', current.email)
            this.tBody.appendChild(contactTr)
        })
    }
}
var request = function(){
    var xhr = new XMLHttpRequest();
    return function (method, url, callback){
        xhr.onload = function(){
            callback(JSON.parse(xhr.responseText))
        };
        xhr.open( method, url);
        xhr.send();
    };
}();




const userList = new Users(document.getElementById('userListTable'));
