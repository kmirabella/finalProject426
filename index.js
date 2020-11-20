const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

export async function getDadJoke() {
    const joke = await axios({
        method: 'get',
        url: 'https://icanhazdadjoke.com/',
        withCredentials: true,
    });
    console.log(joke);
    
    
};

const expressSession = require('express-session');
app.use(expressSession({
    name: "groupSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));
//have to use file path 
const Professor = require('./Professor.js'); 
const Student = require('./Student.js');


const login_data = require('data-store')({path: process.cwd()+'/data/users.json'});


app.post('/login', (req, res) =>{
    let user = req.body.user; 
    let password = req.body.password; 

    let user_data = login_data.get(user); 
    if(user_data == null) {
        res.status(404).send("Not found"); 
        return; 
    }
    if(user_data.password == password){
        //successful login
        console.log("User" + user + " credentials valid");
        req.session.user = user; 
        res.json(true); 
        return; 
    }
    res.status(403).send("Unauthorized");

});
app.get('/logout', (req, res)=> {
    delete req.session.user; 
    res.json(true);
})

// RESTFUL INTERFACE FOR PROF ===========================================
app.get('/professor', (req, res) => {
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return;
    }

    res.json(Professor.getAllIDsForUser(req.session.user));
    return; 
});

app.get('/professor/:id', (req, res) => {
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }

    let p = Professor.findByID(req.params.id);
    if(p == null){
        res.status(404).send("Professor not found");
        return; 
    }
    if(p.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    res.json(p); 

});

app.post('/professor', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    let p = Professor.create(req.body.firstName, req.body.lastname, req.body.email,
        req.session.user, req.body.password, req.body.classes, req.body.students);
    if(p == null){
        res.status(400).send("Bad request");
        return; 
    } 
    return res.json(p);


});
app.put('/professor/:id', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    
    let p = Professor.findByID(req.params.id);
    if(p == null){
        res.status(404).send("Professor not found");
        return; 
    }
    if(p.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    let {firstName, lastName, email, password,  classes, students} = req.body; 
    p.firstName = firstName; 
    p.lastName = lastName;
    p.email = email;
    p.password = password;
    p.classes = classes;
    p.students = students;

    p.update(); 
    res.json(p);

}); 
app.delete('/professor/:id', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    let p = Professor.findByID(req.params.id);
    if(p == null){
        res.status(404).send("Professor not found");
        return; 
    }
    if(p.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    p.delete();
    res.json(true); 
});
// RESTFUL INTERFACE FOR STUDENTS ======================================================
app.get('/student', (req, res) => {
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return;
    }
    res.json(Student.getAllIDsForUser());
    return; 
});
app.get('/student/:id', (req, res) => {
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return;
    }
    let s = Student.findByID(req.params.id);
    if(s== null){
        res.status(404).send("Student not found");
        return; 
    }
    if(s.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    res.json(s); 

});
app.post('/student', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    let s = Student.create(req.body.firstName, req.body.lastname, req.body.email,
        req.session.user, req.body.password, req.body.classes);
    if(s == null){
        res.status(400).send("Bad request");
        return; 
    } 
    return res.json(s);

});
app.put('/student/:id', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    let s = Student.findByID(req.params.id);
    if(s == null){
        res.status(404).send("Student not found");
        return; 
    }
    if(s.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    let {firstName, lastName, email, password,  classes} = req.body; 
    s.firstName = firstName; 
    s.lastName = lastName;
    s.email = email;
    s.password = password;
    s.classes = classes;

    s.update(); 
    res.json(s);

}); 
app.delete('/student/:id', (req, res)=>{
    if(req.session.user == undefined){
        // no one is logged in yet 
        res.status(403).send("unauthorized");
        return; 
    }
    let s= Student.findByID(req.params.id);
    if(s == null){
        res.status(404).send("Student not found");
        return; 
    }
    if(s.user != req.session.user){
        res.status(403).send("unauthorized");
        return; 
    }
    s.delete();
    res.json(true); 
});




const port = 3030; 
app.listen(port, ()=> {
    console.log("this works on port: "+ port);

})