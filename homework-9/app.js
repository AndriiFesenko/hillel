const addContactBtn = document.getElementById('addContactBtn');
const contactList = document.getElementById('contactsList');
const contactNameInput = document.getElementById('nameInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactAgeInput = document.getElementById('ageInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;
const trParent = document.getElementById('contacts');

addContactBtn.addEventListener('click', onAddContactBtnClick);

contactList.addEventListener('click', onContactListDelete) 

function onContactListDelete() {
    if (event.target.className === 'deleteButton') {
        event.target.parentNode.parentNode.remove();
    }
}


function onAddContactBtnClick() {
    // console.log('Add Contact Clicked');    
    submitContact();
}

function submitContact() {
    const contact = {
        name: contactNameInput.value,
        phone: contactPhoneInput.value,
        age: contactAgeInput.value
    }
    addContact(contact);
    resetContactForm();
}

function addContact(contact) {
    // создаем переменную для сбора данных
    const contactTr = document.createElement('tr');

    contactTr.innerHTML = contactTemplate
                            .replace('{{name}}', contact.name)
                            .replace('{{phone}}', contact.phone)
                            .replace('{{age}}', contact.age || '-')
                            
    contactList.appendChild(contactTr);
}

function resetContactForm() {
         contactNameInput.value = '';
         contactPhoneInput.value = '';
         contactAgeInput.value = '';
}






