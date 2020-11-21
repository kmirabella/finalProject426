const class_data = require('data-store')({ path: process.cwd() + '/backend/data/classes.json' });


class Class {

    constructor(id, name, exam_dates, students) {
        this.id = id;
        this.name = name;
        this.exam_dates = exam_dates;
        this.students = students;
    }
    //update should take in any necessary arguments (updated class objects/student rosters/info)
    update() {
        class_data.set(this.id.toString(), this);
    }
    delete() {
        class_data.del(this.id.toString());
    }

}

Class.getAllIDs = () => {
    // return an array of prof ids 
    return Object.keys(class_data.data).map(id => { return parseInt(id); });
}

Class.findByID = (id) => {
    let p = class_data.get(id);
    if (p != null) {
        return new Class(p.id, p.name, p.exam_dates, p.students);
    }
    return null;
}

Class.next_id = Class.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;
Class.create = (name, exam_dates, students) => {
    let id = Class.next_id;
    Class.next_id += 1;
    let p = new Class(id, name, exam_dates, students);
    class_data.set(p.id.toString(), p);
    return p;
}
module.exports = Class;