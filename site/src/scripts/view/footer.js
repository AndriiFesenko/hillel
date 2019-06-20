export class Footer{
    constructor(){
        this.usersArr = [
        {
            img: './src/img/footer/Layer-36.gif'
        },
        {
            img: './src/img/footer/Layer-37.gif'
        },
        {
            img: './src/img/footer/Layer-38.gif'
        },
        {
            img: './src/img/footer/Layer-39.gif'
        },
        {
            img: './src/img/footer/Layer-39.gif'
        },
        {
            img: './src/img/footer/Layer-38.gif'
        },
        {
            img: './src/img/footer/Layer-37.gif'
        },
        {
            img: './src/img/footer/Layer-36.gif'
        }
    ]
        this.userImgBlock = document.querySelector('.users-img-block');
        this.renderUsersImg();
    }

    renderUsersImg(){
        this.userImgBlock.innerHTML = 
                this.usersArr.map((current) => {
                    return `<img src="${current.img}">`
                }).join('')
    }
}