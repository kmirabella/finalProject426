# Welcome to Exam Scheduler!! 

We aim to help relieve the stress of college students by letting Professors schedule their exams with empathy! 

Students can create an account where they input all of their classes they are currently enrolled in, including their exam times. Professors can then see a dashboard of statistics on the amount of students that have exams on a particular day. Inside of their dashboard, Professors can click on the headers in order to sort the table by either exam date or the total amount of their students with exams on that day. They also have the ability to search within the table for a particular day that they have in mind. At the bottom of the screen are two sections showing the busiest days for their students and the Professor's current exam schedule for their classes. 

We hope you enjoy :) 
### link to video!

# Use Case
You are Professor X. You plan to schedule a few exams for each of your classes this upcoming semester but you want to make sure your students will have the resources necessary to perform well in your class and dedicate sufficient time for studying. Create your professor account and encourage your students to sign up as well. Once you've created your class, your students will be able to add the course to their dashboard and input their exam dates for all their exams this semester. Your professor dashboard should populate with the dates your students have exams, how many of your students have exams on each datee, and when your students are busiest throughout the semester.



## Technical Overview
- **Front-end** ----> HTML, CSS, JavaScript **(hosted on Netlify)**
- **Back-end** ----> Express/Node **(hosted on Heroku)**

## API Overview

### Create
```
/signup
    Parameters: 
           firstName: "John", (String), 
           lastName: "Smith", (String),
           email: "johnsmith@unc.edu", (String), 
           password: "password", (String),
           professor: "true", (String)
    Effect: 
           Registers professor in database. 
 /signup
    Parameters: 
           firstName: "John", (String), 
           lastName: "Smith", (String),
           email: "johnsmith@unc.edu", (String), 
           password: "password", (String),
           professor: "false", (String)
    Effect: 
           Registers student in database. 
```

### Read
```
/student
    Effect:
          Returns an array of student ids.
   /:id
      Effect:
            Return the student object with id = :id
   
   /classnames
      /:id
          Effect:
                Return an array of Class objects 
/classes
      Effect:
            Returns and array of class id's
   /:id
      Effect:
            Returns a Class object
/professor
      Effect:
            Returns an array of professor ids.
    /:id
      Effect:
            Returns a Professor object.
/logout
      Effect:
            Logs out user.
```
### Update
```
 /student
      /:id
          /create
              Parameters:
                  name: "COMP455.001" (String)
              Effect:
                  Updates the student object with additional class object

```
