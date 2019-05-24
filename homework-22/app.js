'use strict'
    

    const CONTACTS_URL = 'http://fep-app.herokuapp.com/api/contacts';
    const userTemplate = document.getElementById('userTemplate').innerHTML;
    
    const $popup = $('#popup');
    const $tbody = $('tbody');
    const $addButton = $('#submitUser');
    const $contactName = $('#name');
    const $contactSurname = $('#surname');
    const $contactEmail = $('#email');
    const $contactPhone = $('#phone');
    const $editButton = $('#edit')
    const $container = $('#userList').parent();
    const $input = $popup.find('form').find('input');

    let usersArr = [];
    let userId;
    let isValid;

    const regEx = {
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        phone: /^\+380\d{3}\d{2}\d{2}\d{2}$/
    }
    
    $(document).ready(renderUsers1)

    $container.on('click', onContainerClick);
    $input.on('blur', validateInput);
    
    function onContainerClick(e) {
        if(e.target.value === 'ADD NEW USER'){
            $addButton.val('add');
            openModal();
        } else if (e.target.id === 'closeForm') {
            $('form')[0].reset();
            $input.removeClass('error');
            $popup.hide();
        } else if (e.target.value === 'add') {
            e.preventDefault();
            validateInput();
            if(isValid) {
                addUser();
                $('form')[0].reset();
                $popup.hide();
            } else {
                alert('your info is not correct')
            }
        } else if (e.target.value === 'edit') {
            openModal();
            edit(e);
        } else if (e.target.value === 'submit'){
            e.preventDefault();
            validateInput();
            if(isValid){
                setChanges(e);
                $popup.hide();
            } else {
                alert('your info is not correct')
            }
        } else if (e.target.value === 'delete'){
            deleteUser(e);
        }
    }

    function validateInput(){
        [].forEach.call($input, function () {
            if(!regEx.email.test($contactEmail.val())
            || !regEx.phone.test($contactPhone.val())
            || $contactName.val().length < 1
            || $contactSurname.val().length < 1) {
                $input.addClass('error');
                return isValid = false;
            } else {
                $input.removeClass('error');
                return isValid = true;
            }
        })
        return isValid;
    }

    function addUser() {
        const user = {
            name: $contactName.val(),
            surname: $contactSurname.val(),
            email: $contactEmail.val(),
            phone: $contactPhone.val()
        }
        addUserOnServer(user);
    }
    function openModal() {
        $popup.css('display', 'flex');
    }

    function edit(e){
        const id = e.target.parentNode.parentNode.dataset.userId;
        $addButton.val('submit');
        const $tr = $(e.target).closest('tr');
        const name = $tr.children()[0].innerHTML;
        const surname = $tr.children()[1].innerHTML;
        const email = $tr.children()[2].innerHTML;
        const phone = $tr.children()[3].innerHTML;
        
        $popup.css('display', 'flex');
        
        $contactName.val(name);
        $contactSurname.val(surname);
        $contactEmail.val(email);
        $contactPhone.val(phone);

        saveId(id);
    }

    // save element's id
    function saveId(id){
        return userId = id;
    }
    // put info in array
    function saveData(result){
        return usersArr = result;
    }
    function setChanges(e) {
        const name = $input[0].value;
        const surname = $input[1].value;
        const email = $input[2].value;
        const phone = $input[3].value;
        
        const currentUser = usersArr.find((current) => {
            if(current.id == userId) {
                return current;
            }
        });
        currentUser.name = name;
        currentUser.surname = surname;
        currentUser.email = email;
        currentUser.phone = phone;

        changeUserInfo(CONTACTS_URL + '/' + userId, currentUser);
    }


    function addUserOnServer(user) {
        $.ajax({
            url: CONTACTS_URL,
            type: 'POST',
            data: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
            },
            success: renderUsers1
        })
    }
    
    
    function changeUserInfo(url, currentUser){
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(currentUser),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            success: renderUsers1
        })
    }
    function renderUsers1() {
        $.ajax({
            type: 'GET',
            url: CONTACTS_URL,
            success: function(result){
                const gotUsersList = result.map((current) => {
                    return userTemplate
                                .replace('{{id}}', current.id)
                                .replace('{{name}}', current.name)
                                .replace('{{surname}}', current.surname)
                                .replace('{{email}}', current.email)
                                .replace('{{phone}}', current.phone)
                })
                saveData(result)
                $tbody.html(gotUsersList);
            }
        })
    }
    function deleteUser(e) {
        const id = e.target.parentNode.parentNode.dataset.userId;
        const url = CONTACTS_URL + '/' + id;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: renderUsers1
        })
    }