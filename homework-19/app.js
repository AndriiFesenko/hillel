// 'use strict'
class UserList{
    static CONTACTS_URL = 'http://fep-app.herokuapp.com/api/contacts';

    constructor () {
        this.addNewUser = document.getElementById('addNewUser');
        this.userTemplate = document.getElementById('userTemplate').innerHTML;
        this.tBody = taskList.getElementsByTagName('tbody')[0];
        this.name = document.getElementById('name');
        this.surname = document.getElementById('surname');
        this.email = document.getElementById('email');
        this.phone = document.getElementById('phone');
        this.init();
    }

    init() {
        this.getUserList();
        this.addNewUser.addEventListener('submit', () => this.addUser());
    }


    getUserList(){
        fetch(UserList.CONTACTS_URL, {
            method:'get'
        }).then((resp) => {
            return resp.json();
        }).then((user) => this.fetchUsers(user))
    }

    fetchUsers(user) {
        this.user = user;
        const userList = user.map((current) => {
            return this.userTemplate
                        .replace('{{id}}', current.id)
                        .replace('{{name}}', current.name)
                        .replace('{{surname}}', current.surname)
                        .replace('{{email}}', current.email)
                        .replace('{{phone}}', current.phone)
                        .replace('{{class}}', current === true ? true : false)
        }).join('\n')
        this.tBody.innerHTML = userList;
    }
   
    addUser() {
        const index = this.tBody.lastElementChild.dataset.userId;
        const newUser = {
            name: 0,
            surname: 0
            // id: index,
            // name: this.name.value,
            // surname: this.surname.value,
            // email: this.email.value,
            // phone: this.phone.value
        };
            this.sendUser(newUser)
            // .then(this.getUserList)     
    }

    sendUser(newUser){
        console.log(newUser)
        fetch(UserList.CONTACTS_URL, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {'Content-Type': 'application/json; charset=utf-8',
                      'Access-Control-Allow-Origin': '*' } 
        })
    }




} // close class



const userList = new UserList ();