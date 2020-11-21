

const professor_data = require('data-store')({ path: process.cwd() + '/backend/data/professor.json' });


class Professor {

    constructor(id, firstName, lastName, email, user, password, classes, students) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.user = user;
        this.password = password;
        this.classes = classes;
        this.students = students;
    }
    //update should take in any necessary arguments (updated class objects/student rosters/info)
    update() {
        professor_data.set(this.id.toString(), this);
    }
    delete() {
        professor_data.del(this.id.toString());
    }

}

Professor.getAllIDs = () => {
    // return an array of prof ids 
    return Object.keys(professor_data.data).map(id => { return parseInt(id); });
}

Professor.getAllIDsForUser = (user) => {
    return Object.keys(professor_data.data).filter((id) => professor_data.get(id).user == user).map((id) => parseInt(id));
}

Professor.findByID = (id) => {
    let p = professor_data.get(id);
    if (p != null) {
        return new Professor(p.id, p.firstName, p.lastName, p.email, p.user, p.password, p.classes, p.students);
    }
    return null;
}

Professor.next_id = Professor.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;
Professor.create = (firstName, lastName, email, user, password) => {
    let id = Professor.next_id;
    Professor.next_id += 1;
    let p = new Professor(id, firstName, lastName, email, password, [], []);
    professor_data.set(p.id.toString(), p);
    return p;
}
module.exports = Professor; 