

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

