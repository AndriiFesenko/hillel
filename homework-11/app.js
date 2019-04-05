"use strict"
function Student(name, ...marks) {
    this.name = name;
    this.marks = marks;
    this.averageMark = function getAvg(avg) {
        let total = 0;
        for (let i=0; i<marks.length; i++){
            total += marks[i];
        }
        avg = total/marks.length;
        return avg.toFixed(1);
        
    }
    this.worksDone = function getWorksDone() {
        let works = 0;
        for (let i=0; i<marks.length; i++){
            if (marks[i] > 0) {
                 works++;
            }
        }
        return works;
    }
    this.addMark = function (el) {
        return marks.push(el);
    }
}

const students = [
    new Student('Andrii', 10, 3, 4, 0, 9),
    new Student('Yulian', 6, 0, 8, 10, 0),
    new Student('Roman', 10, 8, 10, 10, 0)
]

function completePercent(percent) {
    let total = 0;
    for (let i=0; i<students.length; i++){
       let a = students[i].marks
       console.log(a)
       for (let i=0; i<a.length; i++) { 
        if (a[i] > 0 ) {
            total += 1;
            }   
       } 
       percent = (total*100)/a.length;
    }
    return +(percent/students.length).toFixed(1);
}

function averageMark(avg) {
    let total = 0;
    for (let i=0; i<students.length; i++){
        let a = students[i].marks;
        for(let i=0; i<a.length; i++) {
            total += a[i];
        }
        avg = total / a.length;
    }
    return +avg.toFixed(1);
}


