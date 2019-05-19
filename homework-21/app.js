'use strict'

$(document).ready(showLocalStorage())


const modal = $('#modalWindow').html();
const $addNewTask = $('#addNewTask');
const $article = $('.article');



$addNewTask.on('click', function(){
    $article.append(modal);

    const $container = $('.container');
    const $saveButton = $('.saveButton');
    const $cancelButton = $('.cancelButton');
    const $taskForm = $('#taskForm');
    const $titleInput = $container.find('input');
    const $textArea = $container.find('textarea');

    $container.fadeIn('slow');
    
    $saveButton.on('click', function(){
        saveTask($titleInput, $textArea);
        $taskForm.remove();
        
    })
    $cancelButton.on('click', function(){
        cancelTask($taskForm);
    })
})

function saveTask($titleInput, $textArea){
    const key = 'task' + Date.now();
    const newTitle = $titleInput.val();
    const newText = $textArea.val();

    const newTask = $('#newTask').html()
                            .replace('{{Title}}', newTitle)
                            .replace('{{Description}}', newText)
                            
    appendElement('.article',newTask)
    localStorage.setItem(key,newTask)
}

function appendElement(route, element){
    $(route).append(element);
}
function cancelTask($taskForm){
    $taskForm.remove();
}
function showLocalStorage(){
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.includes('task')){
            appendElement('.article',localStorage.getItem(key))
        }
    }
}
