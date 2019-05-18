'use strict'

$(document).ready(showLocalStorage())


let $newTask = $('#newTask').html();
const $modal = $('#modalWindow').html();


$('header input').click(function(){
    $('div').append($modal)
    $('.container').fadeIn('slow')
    
    $('.save').click(function(){
        saveTask();
        $('.article .wrapper').remove();
        
    })
    $('.cancel').click(function(){
        cancelTask();
    })
})

function saveTask(){
    const key = 'task' + Date.now();
    const $newTitle = $('.container input').val();
    const $newText = $('.container textarea').val();

    $newTask = $('#newTask').html()
                            .replace('{{Title}}', $newTitle)
                            .replace('{{Description}}', $newText)
                            
    appendElement('.article',$newTask)
    localStorage.setItem(key,$newTask)
}

function appendElement(route, element){
    $(route).append(element);
}
function cancelTask(){
    $('.wrapper').remove();
}
function showLocalStorage(){
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.includes('task')){
            appendElement('.article',localStorage.getItem(key))
        }
    }
}
