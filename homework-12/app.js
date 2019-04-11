"use strict"

function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppingArr = [];
}
// создаем массив для топпингов которые будем собирать в нем.

// Пушим добавленный топпинг в наш созданный массив
Hamburger.prototype.addTopping = function (topping) {
    return this.toppingArr.push(topping);
}

//Высчитываем калории 
Hamburger.prototype.calculateCalories = function () {
    // let totalCaloriesOfAllToppings = 0; заменили на sum в reduce
    // Перебираем наш созданный массив для топпингов , 
    // чтобы извлечь из каждого нового элемента ключ calories
    // и суммируем все полученные значения из ключа calories и возвращаем 
    // сложение всех значений calories от переданных элементов в наш конструктор
   return this.size.calories 
                + this.stuffing.calories 
                + this.toppingArr.reduce((sum, current) => sum + current.calories ,0);
}

// Высчитываем цену
Hamburger.prototype.calculatePrice = function () {
    // let totalPriceOfAllToppings = 0; заменили на sum в reduce
    //Перебираем наш созданный массив для топпингов
    //чтобы извлечь из каждого элемента ключ price
    //суммируем все полученные значения из ключа price и возвращаем
    // сложение всех значений price от переданных элементов в наш конструктор
    return this.size.price 
                + this.stuffing.price
                + this.toppingArr.reduce((sum,current) => sum + current.price ,0) 
}

// Создаем обьекты 
Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20
}
Hamburger.SIZE_BIG = {
    price: 100,
    calories: 40
}
Hamburger.STUFFING_CHEESE = {
    price: 10,
    calories: 20
}
Hamburger.SALAT = {
    price: 20,
    calories: 5
}
Hamburger.POTATO = {
    price: 15,
    calories: 10
}
Hamburger.TOPPING_MAYO = {
    price: 20,
    calories: 5
}
Hamburger.TOPPING_SAUCE = {
    price: 15,
    calories: 0
}


// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log('Calories:' + hamburger.calculateCalories());
// сколько стоит
console.log('Price:' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// А сколько теперь стоит?
console.log('Price with sauce:' + hamburger.calculatePrice());









