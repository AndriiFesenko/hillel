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
    const $userContactInfo = $('#userContactInfo');

    
    
    
    $input.on('input', () => {
        if($userContactInfo.children().length > 0){
            $('.container').remove();
        }else if($input.val().length >= 2){
            $.ajax({
                type: "GET",
                url: USERS_URL + $input.val(),
                success: function(){
                    show();
                }
            })
        }
    })
    
    function show(){
        $input.autocomplete({
        minLength: 2,
        source: function(request, response){
            $.get(USERS_URL + request.term)
            .done((data) => {
                response(getName(data));
            })
        }
    });
        const $ul = $('#ui-id-1')
        $ul.on('click', function(e){
            const userName = $(e.target).html()
            getInfo(userName, e)
    })
}

    function getName(data){
        return data.items.map((data) => {
            return data.login
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
        let date = changeDate(data);
        let myUrl = changeUrl(data.html_url)
        $userContactInfo.html(template
                            .replace('{{img}}', data.avatar_url)
                            .replace('{{Name}}', data.name)
                            .replace('{{src}}', data.html_url)
                            .replace('{{srcName}}', myUrl)
                            .replace('{{reposAmount}}', data.public_repos)
                            .replace('{{folowersAmount}}', data.followers)
                            .replace('{{regDate}}', date)
                            )
    }
    function changeUrl(url) {
        let arr = url.split('/');
        return arr[3]
    }

    function changeDate(current){
            let date = new Date(current.created_at);
            return date.getDate()+'-'+ date.getMonth()+'-'+date.getFullYear();
    }
} );

