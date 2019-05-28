'use strict'



$( function() {
    const $uiWidget = $('.ui-widget');
    $(document)
        .ready(($uiWidget.parent())
        .append($('<div id="userContactInfo"></div>')))

    const $input = $('#tags');
    const USERS_URL = 'https://api.github.com/search/users?q=';
    const USERS_DATA = 'https://api.github.com/users/';
    const template = document.getElementById('userInfo').innerHTML;
    const $ul = $('#ui-id-1');
    const $userContactInfo = $('#userContactInfo');
    let availableTags = [];

    
    
    
    $input.on('input', () => {
        if($userContactInfo.children().length > 0){
            $('.container').remove();
        }else if($input.val().length >= 2){
            $.ajax({
                type: "GET",
                url: USERS_URL + $input.val(),
                success: function(data){
                    saveData(data);
                    show();
                }
            })
        }
    })
    
    function saveData(data){
        data = data.items.map((current) =>{
            return current.login
        })
        return availableTags = data;
    }
    
    function show(){
            $input.autocomplete({
            source: availableTags
        });
            const $ul = $('#ui-id-1')
            $ul.on('click', function(e){
                const userName = $(e.target).html()
                getInfo(userName, e)
        })
    }
    function getInfo(userName, e){
        e.stopImmediatePropagation();
        $.ajax({
            type: "GET",
            url: USERS_DATA + userName,
            success: function(data){
                fetchUser(data);
            }
        })
    }
    function fetchUser(data){
        const dataArray = $.makeArray(data)
        const gotUser = dataArray.map((current) => {
            let date = changeDate(current);
            let myUrl = changeUrl(current.html_url)
            return template
                        .replace('{{img}}', current.avatar_url)
                        .replace('{{Name}}', current.name)
                        .replace('{{src}}', current.html_url)
                        .replace('{{srcName}}', myUrl)
                        .replace('{{reposAmount}}', current.public_repos)
                        .replace('{{folowersAmount}}', current.followers)
                        .replace('{{regDate}}', date)
        })
        $userContactInfo.append(gotUser);
    }
    function changeUrl(url) {
        console.log(url);
        let arr = url.split('/');
        return arr[3]
    }

    function changeDate(current){
        let splitedDate = current.created_at.split('-', 3);
        let month = splitedDate[2].slice(0,2);
        let yearAndDate = splitedDate.slice(0,2);
        let date = yearAndDate.concat(month)
        date.reverse();
        let newDate = date.join('-');
        return newDate;
    }
} );