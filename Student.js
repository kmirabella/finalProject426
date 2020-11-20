const student_data = require('data-store')({path: process.cwd()+'/data/student.json'});


class Student{

    constructor(id, firstName, lastName, email, password, classes){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName; 
        this.email = email; 
        this.password = password;
        this.classes = classes;
    }
    update(){
        student_data.set(this.id.toString(), this); 
    }
    delete(){
        student_data.del(this.id.toString());
    }


}
Student.getAllIDs= ()=>{
    // return an array of prof ids 
    return Object.keys(student_data.data).map(id=>{return parseInt(id);});
}

Student.findByID= (id) => {
    let s = student_data.get(id);
    if(s != null){
     return new Student(s.id, s.firstName, s.lastName, s.email, s.password, s.classes); 
    }
    return null; 
 }



Student.next_id =Student.getAllIDs().reduce((max, next_id)=>{
    if(max <next_id){
        return next_id; 
    }
    return max; 
}, -1)+1;


Student.create = (firstName, lastName, email, password, classes ) => {
    let id = Student.next_id; 
    Student.next_id +=1; 
    let s= new Student(id, firstName, lastName, email, password, classes);
    student_data.set(s.id.toString(),s);
    return s; 


}
module.exports = Student; 