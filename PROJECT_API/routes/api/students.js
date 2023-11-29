const express = require('express');
const uuid = require('uuid')
const router = express.Router();
const students = require('../../students');

// GET ALL MEMBERS
router.get('/', (req, res) => {
    res.json(students);
});
// GET http://localhost:5000/api/students

// --------------------------------------------------------------------------------------------------------------------------------------------

// GET SINGLE MEMBER
// params is to get any parameter.
router.get('/:rollno', (req, res) => {
    // Now, we are getting an empty array if we write an invalid rollno, what we want is, it to give a message of no roll no found.
    const found = students.some(student => student.rollno === parseInt(req.params.rollno));
    // res.send(req.params.rollno); we will get the mentioned rollno only here.
    if(found) {
    res.json(students.filter(student => student.rollno === parseInt(req.params.rollno)));
    // student.rollno is a number and req.params.id is a string, we are === which means type has to match too.
    } else {
        res.status(400).json({msg: `Student Not Found With The Id Of ${req.params.rollno}`});
    }
    
});
// GET http://localhost:5000/api/students/2110990774 on thunder-client

//--------------------------------------------------------------------------------------------------------------------------------------------

// CREATE STUDENT
// We can use the same routes as long as we have different methods.
router.post('/', (req, res) => {
    // We should be able to send data and that data is going to be in request object.
    // If we need to get a response back, on the formation of new student data, we need to add parser.
    // res.send(req.body);
    const newStudent = {
        // WE installed uuid for this.
        name: req.body.name,
        rollno: uuid.v4(),
        email: req.body.email,
        status: 'active'
    }
    // To make sure name and email are sent with the request.
    if(!newStudent.name || !newStudent.email){
        return res.status(400).json({msg: 'Please Include a name And email'});
    }
    // Now if want to add this new member in our existing array. here we are taking the students array and pushing on the new student.
    students.push(newStudent);
    res.json(students);
});
// POST http://localhost:5000/api/students 

//---------------------------------------------------------------------------------------------------------------------------------------------

// UPDATE MEMBER
// updation is done with basically put request.
// We are gonna make request to API roll put request, we are gonna send name, email or either one we want to update, check if it is found, if it is then we are gonna put req body in the variable, loop thru the members and check if the id matches. if the id is equal to the id that is passed, then we are gonna set the member name depending upon if the name was sent with req body, if it was sent, we will send it with the new name, if it wasn't we will keep the old one and do the same with email. now we have to send back the response.
router.put('/:rollno', (req, res) => {
    const found = students.some(student => student.rollno === parseInt(req.params.rollno));

    if(found) {
        const updStudent = req.body;
        students.forEach(student => {
            if(student.rollno === parseInt(req.params.rollno)){
                student.name = updStudent.name ? updStudent.name : student.name;
                student.email = updStudent.email ? updStudent.email : student.email;

                res.json({msg: 'Student Updated', student});
            }
        });
    } 

    else {
        res.status(400).json({msg: `Student Not Found With The Id Of ${req.params.rollno}`});
    }
});

// PUT http://localhost:5000/api/students/2110990774, info in body to be changed.

//----------------------------------------------------------------------------------------------------------------------------------------------

// DELETE MEMBER
// It is gonna be a delete request instead of get request.
router.delete('/:rollno', (req, res) => {
    const found = students.some(student => student.rollno === parseInt(req.params.rollno));

    if(found) {
    res.json({ 
        msg: 'Student Deleted', students: students.filter(student => student.rollno !== parseInt(req.params.rollno))});
    } 
    else {
        res.status(400).json({msg: `Student Not Found With The Id Of ${req.params.rollno}`});
    } 
});
// DELETE http://localhost:5000/api/students/2110990774

module.exports = router;

// run npm dev
// npm i uuid
// npm i moment
// npm i -d nodemon
// npm i express
// npm init -y