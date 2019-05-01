'use strict'
class Users {
    constructor(){
        this.userListTable = document.getElementById('userListTable')
        this.userTemplate = document.getElementById('userTemplate').innerHTML;
        this.tBody = this.userListTable.lastElementChild;
        this.URL = 'https://jsonplaceholder.typicode.com/users';
        this.init();
    }
    init(){
        request('get', this.URL, (usersInfo) => this.showInfo(usersInfo));
    }
    showInfo(usersInfo){
        for(let i=0; i<usersInfo.length; i++){
            let contactTr = document.createElement('tr');
            contactTr.innerHTML = this.userTemplate
                                    .replace('{{name}}', usersInfo[i].name)
                                    .replace('{{phone}}', usersInfo[i].phone)
                                    .replace('{{email}}', usersInfo[i].email)                
            this.tBody.appendChild(contactTr)
        }
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




const userList = new Users(document.getElementById('usersListTable'));
