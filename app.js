const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

console.log(salt);
const password = "hello tue tue";
const hash = bcrypt.hashSync(password, salt);

console.log(hash);

const port = 3000;

app.use(express.json({ limit: "5kb" }));
app.use(express.urlencoded());

const schoolData = {
  students: [],
  instructors: [],
};

function displayHome(req, res) {
  res.status(202).send(`App running on localhost 3000`);
}
// ..............................................................................
function getStudent(req, res) {
  res.status(202).json({ status: "success", data: schoolData.students });
}
function createStudent(req, res) {
  const newStudent = req.body;

  //checks if student already exists before creating new student
  const studentIndex = schoolData.students.findIndex(
    (student) => student.email === newStudent.email
  );

  if (studentIndex > -1) {
    res.status(400).json({
      success: false,
      message: "Student already exists",
    });
  } else {
    const passwordHash = bcrypt.hashSync(newStudent.password, salt);

    newStudent.password = passwordHash;
    schoolData.students.push(newStudent);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
    });
  }
}
// .....................................................................................

function getInstructor(req, res) {
  res.status(202).json({ status: "success", data: schoolData.instructors });
}
function createInstructor(req, res) {
  const newInstructor = req.body;

  //checks if instructor already exists before creating new instructor
  const instructorIndex = schoolData.instructors.findIndex(
    (instructor) => instructor.email === newInstructor.email
  );

  if (instructorIndex > -1) {
    res.status(400).json({
      success: false,
      message: "Instructor already exists",
    });
  } else {
    const passwordHash = bcrypt.hashSync(newInstructor.password, salt);

    newInstructor.password = passwordHash;
    schoolData.instructors.push(newInstructor);
    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
    });
  }
}

//........................................................................................................
//displays the base route
app.get("/", displayHome);

//gets all students
app.get("/students", getStudent);

app.post("/students", createStudent);

//gets all instructors
app.get("/instructors", getInstructor);

app.post("/instructors", createInstructor);

//starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
