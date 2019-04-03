function calculator() {
    let value = 10;

    return {
        add: function add(el) {
            const result = value + el;
            console.log(result);
        },
        sub: function sub(el) {
            const result = value - el;
            console.log(result);
        },
        divide: function divide(el) {
            const result = value / el;
            console.log(result);
        },
        mult: function mult(el) {
            const result = value * el;
            console.log(result);
        },
        set: function set(el) {
            value = el;
            console.log(value);
        },
        get: function get() {
            console.log(value);
        }
    }
}
const calc = calculator();

console.log(calc.add(45));
console.log(calc.sub(45));
console.log(calc.divide(5));
console.log(calc.mult(5));
console.log(calc.set(100));
console.log(calc.add(45));
console.log(calc.get());
