'use strict'
    const CONTACTS_URL = 'http://fep-app.herokuapp.com/api/contacts';

    const taskList = document.getElementById('taskList');
    const addNewUserForm = document.getElementById('addNewUserForm');
    const userTemplate = document.getElementById('userTemplate').innerHTML;
    const tBody = taskList.getElementsByTagName('tbody')[0];
    const contactName = document.getElementById('name');
    const contactSurname = document.getElementById('surname');
    const contactEmail = document.getElementById('email');
    const contactPhone = document.getElementById('phone');

    let users = [];

    init();
    
    function init() {
        getUserList(CONTACTS_URL);
        addNewUserForm.addEventListener('submit', submitForm);
        tBody.addEventListener('click', onClick);
    }
    
    function onClick(e){
        if(e.target.parentNode.parentNode == tBody) {
            changeActiveColor(e);
        } else if (e.target.value == 'delete'){
            deletUser(e);
        }
    }
    function changeActiveColor(e){
        const id = e.target.parentNode.dataset.userId;
        users.forEach((current) => {
            if (current.id == id){
                if(current.is_active){
                    current.is_active = false
                } else {
                    current.is_active = true
                }
                changeActiveClass(CONTACTS_URL + '/' + id, current)
                .then(() => getUserList(CONTACTS_URL))
            }
        })
    }
    function changeActiveClass(url, element){
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(element),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
    function getUserList(url){
        return fetch(url, {method:'get'})
                .then((resp) => resp.json())
                .then(setUsers)
                .then(renderUsers)
    }
    function setUsers(data){
        users = data;
        return users;
    }
    function renderUsers(user) {
        const userList = user.map((current) => {
            return userTemplate
                        .replace('{{id}}', current.id)
                        .replace('{{name}}', current.name)
                        .replace('{{surname}}', current.surname)
                        .replace('{{email}}', current.email)
                        .replace('{{phone}}', current.phone)
                        .replace('{{class}}', current.is_active ? true : false)
        }).join('\n')
        tBody.innerHTML = userList;
    }
    function submitForm(event){
        event.preventDefault();
        addUser();
        resetForm();
   }
   function addUser() {
        const newUser = {
            name: contactName.value,
            surname: contactSurname.value,
            email: contactEmail.value,
            phone: contactPhone.value,
            is_active: true
        };
            addUserOnServer(CONTACTS_URL, newUser)
            .then(() => getUserList(CONTACTS_URL))
    }
    function addUserOnServer(url, element){
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(element),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
            }
        })
    }

    function resetForm(){
        addNewUserForm.reset();
    }

    function deletUser(e) {
        const id = e.target.parentNode.parentNode.dataset.userId;
        const url = CONTACTS_URL + '/' + id
        deleteUser(url)
        .then(() => getUserList(CONTACTS_URL))
    }

    function deleteUser(url){
        return fetch(url, {method: 'DELETE'})
    }