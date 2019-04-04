

function calculator(value) {
    return {
        add: function add(el) {
            return value + el;
        },
        sub: function sub(el) {
            return value - el;
        },
        divide: function divide(el) {
            return value / el;
        },
        mult: function mult(el) {
            return value * el;
        },
        set: function set(el) {
            return value = el;
        },
        get: function get() {
            return value
        }
    }
}

const calc = calculator(10);













// console.log(calc.add(45));
// console.log(calc.sub(45));
// console.log(calc.divide(5));
// console.log(calc.mult(5));
// console.log(calc.set(100));
// console.log(calc.add(45));
// console.log(calc.get());
