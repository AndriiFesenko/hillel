const parentDiv = document.getElementById('parentDiv');
const taskList = document.getElementById('taskList')
const button = parentDiv.lastElementChild;

parentDiv.addEventListener('keydown', submitKey)
button.addEventListener('click', addNewTask);


function addNewTask() {
    // Создаем новый элемент div
    const div = document.createElement('div');
    
    // Присваиваем в созданный элемент 
    // значение с поля input
    const userTask = parentDiv.firstElementChild.value;
    div.innerHTML = userTask;

    // передаем новый элемент ребенком в taskList 
    taskList.appendChild(div);

    //обнуляем value нашего поля для ввода tasks
    reset();

    //Меняем цвет . Если задача сделана - красный 
    // Если нет - желтый
    div.addEventListener('click', isTaskDone);
    taskList.classList.add('addedTasks');
}

function submitKey(e){
    if(e.keyCode == 13) {
        addNewTask();
    }
}

function reset() {
    parentDiv.firstElementChild.value = '';
}

function isTaskDone(e) {
    e.target.classList =
    e.target.className === 'taskIsDone' ?
        'taskIsNotDone' :
        'taskIsDone';

}


