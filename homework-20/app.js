'use strict'
    const CONTACTS_URL = 'http://fep-app.herokuapp.com/api/contacts';

    const userList = document.getElementById('userList');
    const addNewUserForm = document.getElementById('addNewUserForm');
    const userTemplate = document.getElementById('userTemplate').innerHTML;
    const tBody = userList.getElementsByTagName('tbody')[0];
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
        userList.parentNode.addEventListener('click', (e) => {
            if(e.target.className == 'pop-container'){
                e.target.remove();
            }
        })
    }
    
    function onClick(e){
        const id = e.target.parentNode.dataset.userId;
        if(e.target.parentNode.parentNode == tBody) {
            getInfoAboutUser(CONTACTS_URL + '/' + id)
        } else if (e.target.value == 'delete'){
            deletUser(e);
        } else if (e.target.value == 'edit') {
            edit(e);
        } else if (e.target.value == 'save') {
            save(e);
        }
    }

    function edit(e){
        const element = e.target.parentNode.parentNode;
        [].forEach.call(element.children, (current) =>{
            if(typeof(current.children[0]) == 'undefined') {
                const input = document.createElement('input');
                input.value = current.innerHTML;
                const td = document.createElement('td');
                current.parentNode.replaceChild(td, current);
                td.appendChild(input)
            } else {
                if(current.children[0].value == 'delete'){
                    current.children[0].style.display = "none"
                } else {
                    current.children[0].value = 'save'
                }
            }
        })
    }
    function save(e){
        e.preventDefault();
        const id = e.target.parentNode.parentNode.dataset.userId
        const element = e.target.parentNode.parentNode.children;
        const url = CONTACTS_URL + '/' + id;
        users.forEach((current) => {
            if(current.id == id){
                current.name = element[0].children[0].value;
                current.surname = element[1].children[0].value;
                current.email = element[2].children[0].value;
                current.phone = element[3].children[0].value;
                changeInfo(url, current)
                .then(() => getUserList(CONTACTS_URL))
            } 
        })
    }

    function getInfoAboutUser(url){
        return fetch(url, {method: 'GET'})
                .then((resp) => resp.json())
                .then((showUser))
    }
    function showUser(userInfo){
        const div = document.createElement('div');
        const ul = document.createElement('ul');
        div.setAttribute('class', 'pop-container');
        ul.setAttribute('class', 'pop-context');
        userList.parentNode.appendChild(div);
        div.appendChild(ul)

        for(let key in userInfo){
            if(key == 'id' || key == 'is_active'){
                
            } else {
                const li = document.createElement('li')
                li.innerHTML = key + ': ' + userInfo[key]
                ul.appendChild(li)
            }
        }
    }

    function changeInfo(url, element){
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
        }).join('\n')
        tBody.innerHTML = userList;
    }
    function submitForm(event){
        event.preventDefault();
        addUser();
        resetForm();
   }
   function addUser(){
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
        const id = e.target.parentNode.parentNode.dataset.userId
        const url = CONTACTS_URL + '/' + id
        deleteUser(url)
        .then(() => getUserList(CONTACTS_URL))
    }

    function deleteUser(url){
        return fetch(url, {method: 'DELETE'})
    }