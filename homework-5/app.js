
// Выводит только четные числа с массива
let sum = 0;
function fun1() {
    let userNumb = prompt('type a numb');
    let arrOfUserNumb = userNumb.split('');
    if (!validate(arrOfUserNumb)) {
        alert('invalid');
        fun1();
    } 
    for(let i = 0;i<arrOfUserNumb.length;i++){
        a = arrOfUserNumb[i] % 2;
        if (!a) {
            sum = sum + 1; // sum++
        } 
    }
    return sum;
}
fun1();
alert(sum);

function validate(value) {
    return (isNaN(value)
            || value === ' '
            || value === null );
}

// генерирует рандомное число от 1000 до 2000
// генерирует рандомное число от 1000 до 2000

let numb1;
let numb2;
function getRandom() {
    let min = 1000;
    let max = 2000;
    numb1 = Math.random() * ((max + 1) - min) + min;
    numb2 = Math.random() * ((max + 1) - min) + min;
    console.log(Math.round(numb1), Math.round(numb2));
    if (numb1 > numb2)  {
        alert(Math.round(numb1))
    } else {
        alert(Math.round(numb2))
    }
}
getRandom();

