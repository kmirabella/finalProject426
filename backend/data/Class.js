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