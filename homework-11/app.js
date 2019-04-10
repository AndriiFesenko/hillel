"use strict"
function Student(name, ...marks) {
    this.name = name;
    this.marks = marks;
    this.averageMark = averageMark;
    this.worksDone = worksDone;
    this.addMark = addMark;
}

function averageMark() {
    let arr = this.marks.reduce(function(total, current){
        return total + current;
    }, 0)
    return arr/this.marks.length;
}

function worksDone() {
    let works = 0;
    this.marks.forEach(function(item){
        if (item > 0) {
            works++;
        }
    }) 
    return works;
}

function addMark(el) {
    return this.marks.push(el);
}




const students = [
    new Student('Andrii', 10, 3, 2, 0, 9),
    new Student('Andrii', 0, 3, 4, 0, 2)
]



function groupAverageMark() {
    let averageAllStudMarks = students.reduce(function(total, current){
        return total + current.averageMark()
    }, 0)
    return averageAllStudMarks/students.length;
}

function completePercent(){
    let totalWorks = students.reduce(function(total, current){
        return total + current.worksDone()
    }, 0)
    let allWorks = students.reduce(function(total, current){
        return total + current.marks.length
    }, 0)
    return totalWorks/allWorks*100 + '%';
    // totalWorks * 100 / allWorks;
}


