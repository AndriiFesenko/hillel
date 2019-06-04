import $ from 'jquery';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';


export default class ContactModal{
    constructor(){
        this.appendModal();
    }

    appendModal(){
        const self = this;

        this.$modal = $(
            `<div id="dialog-form" title="Create new Contact">           
                <form id="contactForm">
                    <fieldset>
                    <label for="nameInput">Name</label>
                    <input type="hidden" id="idInput" name="idInput">
                    <input type="text" id="nameInput" name="nameInput">
                    
                    <label for="surnameInput">Surname</label>
                    <input type="text" id="surnameInput" name="surnameInput">

                    <label for="phoneInput">Phone</label>
                    <input type="text" id="phoneInput" name="phoneInput">

                    <label for="emailInput">Email</label>
                    <input type="text" id="emailInput" name="emailInput">
                
                    <!-- Allow form submission with keyboard without duplicating the dialog button -->
                    <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                    </fieldset>
                </form>
            </div>`
        );

        this.$inputs = {
            id: this.$modal.find('#idInput'),
            name: this.$modal.find('#nameInput'),
            surname: this.$modal.find('#surnameInput'),
            phone: this.$modal.find('#phoneInput'),
            email: this.$modal.find('#emailInput'),
        };
        console.log(this.$inputs);

        this.$contactForm = this.$modal.find('form');

        $(document.body).append(this.$modal);

        this.$modal.dialog({
            autoOpen: false,
            height: 400,
            width: 350,
            modal: true,
            buttons: {
                Save: this.onSaveClick.bind(this),
                Cancel: () => self.$modal.dialog('close')
            },
            close: this.resetContactForm.bind(this)
        });
    }

    setData(contact){
        this.contact = contact;

        this.$inputs.id.val(contact.id);
        this.$inputs.name.val(contact.name);
        this.$inputs.surname.val(contact.surname);
        this.$inputs.phone.val(contact.phone);
        this.$inputs.email.val(contact.email);
    }

    show(contact){
        this.setData(contact);
        this.$modal.dialog('open');
    }

    onSaveClick(){
        this.contact.name = this.$inputs.name.val();
        this.contact.surname = this.$inputs.surname.val();
        this.contact.phone = this.$inputs.phone.val();
        this.contact.email = this.$inputs.email.val();
        this.contact.is_active = true;

        if (this.$inputs.id.val()){
            this.contact.id = this.$inputs.id.val();
        }

        this.$modal.dialog('close');
        this.onSave && this.onSave(this.contact);
    }

    resetContactForm(){
        this.$contactForm[0].reset();
    }
}