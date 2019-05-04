'use strict'
class Users {
    static BASE_URL = 'https://jsonplaceholder.typicode.com';
    static USERS_PATH = '/users';
    static POSTS_PATH = '/posts';
    static ALBUMS_PATH = '/albums';
    constructor(userListTable){
        this.userListTable = userListTable;
        this.init();
    }
    init(){
        this.userTemplate = document.getElementById('userTemplate').innerHTML;
        this.userPosts = document.getElementById('userPosts');
        this.userAlbums = document.getElementById('userAlbums')
        this.tBody = this.userListTable.lastElementChild;
        this.usersInfoRequest();
        this.tBody.addEventListener('click', (e) => this.onBodyClick(e));
    }
    usersInfoRequest(){
        const setUserInfo = this.request('get', Users.BASE_URL + Users.USERS_PATH);
        setUserInfo.then((usersInfo) => this.showInfo(usersInfo))
    }
    onBodyClick(e){
        this.userId = e.target.parentNode.dataset.userId;
        this.name = e.target.parentNode.firstElementChild.innerHTML;
        this.sendRequest();
    }
    sendRequest(){
        const setUserPosts = this.request('get', Users.BASE_URL + Users.POSTS_PATH);
        setUserPosts.then((userPosts) => {
            this.showElement(userPosts, this.userPosts, ' Posts')
        }).then(() => this.request('get', Users.BASE_URL + Users.ALBUMS_PATH))
          .then((userAlbums) => {
            this.showElement(userAlbums, this.userAlbums, ' Albums')
        })
    }
    showElement(element, container, type){
        const usersTitles = this.name + type + element.map((user) => {
            if(user.userId == this.userId) {
                return '<li>' + user.title + '</li>';
            }
        }).join('')
        container.innerHTML = usersTitles;
    }
    request(method, url, body = null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest;
            xhr.open(method, url);
            xhr.onload = () => {
                if(xhr.status < 300){
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr.responseText)
                }
            }
            xhr.onerror = () => reject(JSON.parse(xhr.responseText));
    
            xhr.send(JSON.stringify(body))
        })
    }

    showInfo(usersInfo){
        this.tBody.innerHTML = usersInfo.map((users) => {
            return this.userTemplate
            .replace('{{id}}', users.id)
            .replace('{{name}}', users.name)
            .replace('{{phone}}', users.phone)
            .replace('{{email}}', users.email)
        }).join('')
    }
}






const userList = new Users(document.getElementById('userListTable'));


