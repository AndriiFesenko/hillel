const obj = {
    name: 'Alex', 
    age: 33, 
    adress: { country: 'UA', 
              city: 'Dnipro' 
            }
    };

const objCopy = {} ;
    for (var key in obj){
        objCopy[key] = obj[key]
    }

console.log(obj, objCopy);


obj.name = 'Andrii';
obj.age = '23';
obj.adress.country = 'Ukraine';
obj.adress.city = 'Kyiv';

console.log(obj, objCopy);


