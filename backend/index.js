// export async function getDadJoke() {
//     const joke = await axios({
//         method: 'get',
//         url: 'https://icanhazdadjoke.com/',
//         withCredentials: true,
//     });
//     console.log(joke);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
const Class = require('./Class.js');
const login_data = require('data-store')({ path: process.cwd() + '/backend/data/users.json' });

app.post('/login', (req, res) => {
    let user = req.body.user;
    let password = req.body.password;
    let user_data = login_data.get(user);
    if (user_data == null) {
        res.status(404).send("Account not found");
        return;
    }
    if (user_data.password == password) {
        //successful login
        console.log("User" + user + " credentials valid");
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

app.post('/signup', (req, res) => {
    delete req.session.user;
    let first = req.body.firstName;
    let last = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    /** Had to delimit emails so it could be used as id
     *  All user keys for cookies/stores login info are
     *  user's email . => ;
     *  ex: johndoe@live.unc.edu => johndoe@live;unc;edu
     *  Prevents creation of johndoe@live {
     *                                     unc: {
     *                                            edu: {}}}
     * */
    let delimitedEmail = req.body.email.split(".");
    let userId = delimitedEmail.reduce((x, y) => x + ";" + y);

    req.session.user = userId;

    if (login_data.has(userId)) {
        res.status(403).send("An account with this email already exists.");
        return;
    }
    let newUser = {
        "password": password,
        "first": first,
        "last": last
    }
    let created = null;
    if (req.body.professor == 'true') {
        newUser["type"] = "Professor";
        login_data.set(userId, newUser);
        created = Professor.create(first, last, email, userId, password);
    } else if (req.body.professor == 'false') {
        newUser["type"] = "Student";
        login_data.set(userId, newUser);
        created = Student.create(first, last, email, userId, password);
    } else {
        res.status(400).send("Bad request. Please specify if you are a student or professor.");
    }
    res.json(created);
})

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json('Successfully logged out');
})

// RESTFUL INTERFACE FOR PROF ===========================================
// possibly unecessary method
app.get('/professor', (req, res) => {
    // if (req.session.user == undefined) {
    //     // no one is logged in yet 
    //     res.status(403).send("Unauthorized");
    //     return;
    // }

    res.json(Professor.getAllIDsForUser(req.session.user));
    return;
});

// will be executed when professorView.html switches classes via nav bar drop-down
// original login for professors should direct to some class of theirs (Professor.getAllIDsForUser(req.session.user))
// or will execute on successful login
app.get('/professor/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let p = Professor.findByID(req.params.id);
    if (p == null) {
        res.status(404).send("Professor not found");
        return;
    }
    if (p.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(p);

});

// necessary for update professor's classes/examDates...
app.put('/professor/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }

    let p = Professor.findByID(req.params.id);
    if (p == null) {
        res.status(404).send("Professor not found");
        return;
    }
    if (p.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    let { firstName, lastName, email, password, classes, students } = req.body;
    p.firstName = firstName;
    p.lastName = lastName;
    p.email = email;
    p.password = password;
    p.classes = classes;
    p.students = students;

    p.update();
    res.json(p);

});

// prof. deletes their account
app.delete('/professor/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let p = Professor.findByID(req.params.id);
    if (p == null) {
        res.status(404).send("Professor not found");
        return;
    }
    if (p.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    p.delete();
    res.json(true);
});
// RESTFUL INTERFACE FOR STUDENTS ======================================================
// probably uncessary
app.get('/student', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(Student.getAllIDsForUser());
    return;
});

// executed after successful student login
app.get('/student/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Student.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Student not found");
        return;
    }
    if (s.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    res.json(s);

});

// possibly uncessary since signup method combines student and professor logins
app.post('/student', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Student.create(req.body.firstName, req.body.lastname, req.body.email,
        req.session.user, req.body.password, req.body.classes);
    if (s == null) {
        res.status(400).send("Bad request");
        return;
    }
    return res.json(s);

});

// student update's their profile/information/exams??
app.put('/student/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Student.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Student not found");
        return;
    }
    if (s.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    let { firstName, lastName, email, password, classes } = req.body;
    s.firstName = firstName;
    s.lastName = lastName;
    s.email = email;
    s.password = password;
    s.classes = classes;

    s.update();
    res.json(s);

});

// student deletes their account
app.delete('/student/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Student.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Student not found");
        return;
    }
    if (s.user != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    s.delete();
    res.json(true);
});

const port = 3030;
app.listen(port, () => {
    console.log("this works: " + port)

})

// RESTFUL INTERFACE FOR Classes ===========================================
// possibly unecessary method
app.get('/classes', (req, res) => {
    // if (req.session.user == undefined) {
    //     // no one is logged in yet 
    //     res.status(403).send("Unauthorized");
    //     return;
    // }

    res.json(Class.getAllIDs());
    return;
});

//Get a particular class's data
app.get('/classes/:id', (req, res) => {
    res.json(Class.findByID(req.params.id));
    return;
});

//Professor deletes their class
app.delete('/classes/:id', (req, res) => {
    if (req.session.user == undefined) {
        // no one is logged in yet 
        console.log(req.session);
        res.status(403).send("Unauthorized");
        return;
    }
    let s = Student.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Student not found");
        return;
    }
    if (req.session.user.type !== "Professor") {
        res.status(403).send("Unauthorized");
        return;
    }
    s.delete();
    res.json(true);
});



