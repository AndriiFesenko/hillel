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
    const popup = document.getElementById('popup').innerHTML;
    
    let users = [];

    init();

    function init() {
        getUserList(CONTACTS_URL);
        addNewUserForm.addEventListener('submit', submitForm);
        tBody.addEventListener('click', onClick);
        userList.parentNode.addEventListener('click', (e) => {
            if(e.target.className == 'pop-container'){
                e.target.parentNode.remove();
            }
        })
    }
    
    function onClick(e){
        const id = e.target.parentNode.dataset.userId;
        if(e.target.parentNode.parentNode == tBody) {
            getInfoAboutUser(CONTACTS_URL + '/' + id, e)
        } else if (e.target.value == 'delete'){
            deletUser(e);
        } else if (e.target.value == 'edit') {
            edit(e);
        } else if (e.target.value == 'save') {
            save(e, e.target.parentNode.parentNode.dataset.userId);
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
    function save(e, id){
        e.preventDefault();
        const element = e.target.parentNode.parentNode;
        const input = element.getElementsByTagName('input')
        const url = CONTACTS_URL + '/' + id;
        const currentUser = users.find((current) => current.id === id)

        currentUser.name = input[0].value;
        currentUser.surname = input[1].value;
        currentUser.email = input[2].value;
        currentUser.phone = input[3].value;

        changeInfo(url, currentUser)
        .then(() => getUserList(CONTACTS_URL))
    }

    function getInfoAboutUser(url, e){
        return fetch(url, {method: 'GET'})
                .then((resp) => resp.json())
                .then((userInfo) => showUser(userInfo, e))
    }

    function showUser(userInfo, e){
        const div = document.createElement('div');
        const infoInPopup = popup
                            .replace('{{name}}', userInfo.name)
                            .replace('{{surname}}', userInfo.surname)
                            .replace('{{email}}', userInfo.email)
                            .replace('{{phone}}', userInfo.phone)
        div.innerHTML = infoInPopup;
        userList.parentNode.appendChild(div)
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
        return users = data
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