const express = require("express");
// const mongoose = require("mongoose");
const router = express.Router();
const { mentor, student } = require("../dbconnect/schema");

// Assigning Mentor to the Student
router.put("/student/:ID/assign-mentor", async (req, res) => {
  try {
      const { ID } = req.params;
      const AssignedMentor = req.body; 
      const Students = await student.findOneAndUpdate(
        {_id: ID},
        {$set : AssignedMentor}  
            );
            Students ? res.send("Mentor is successfully assigned to the student")
            : res.status(404).send("mentor has not been assigned a student")
    }
     catch (err) {
      console.log(err);
      return res.status(400).send("found the problem",err)
    }
});

// Add muliple Students to the Mentor
router.put("/mentor/:ID/assign-student", async (req, res) => {
  try {
      const { ID } = req.params;
      const AssignedStudent = req.body; 
      const Mentors = await mentor.findOneAndUpdate(
        {_id: ID},
        {$set : AssignedStudent}  
            );
            Mentors ? res.send("student is successfully assigned to the mentor")
            : res.status(404).send("Student has not been assigned a mentor")
    }
     catch (err) {
      console.log(err);
      return res.status(400).send("found the problem",err)
    }
});

// Check if a student has a mentor and exclude such students from the list
router.get("/students", async (req, res) => {
  try {
    // Find students who don't have a mentor
    const students = await student.find({ mentorAssigned: null });
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving students." });
  }
});

//Show all students for a particular mentor
router.get("/mentor/:Id/students", async (req, res) => {
  try {
    const { Id } = req.params;

    // Check if the mentor exists in the database
    const Mentor = await mentor.findById({_id: Id});
    if (!Mentor) {
      return res.status(404).send({ message: "Mentor not found." });
    }
    // Find all students assigned to the mentor
    const Students = await student.find({ mentorAssigned: Id });
    res.status(200).send(Students);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving students." });
  }
});

router.get("/students/:Id/previous-mentor", async (req, res) => {
  try {
    const { Id } = req.params;

    // Check if the student exists in the database
    const Students = await student.findById(Id);
    if (!Students) {
      return res.status(404).send({ message: "Student not found." });
    }

    // Find the previous mentor (if any) by ID
    const previousMentor = student.mentorAssigned
      ? await mentor.findById(student.mentorAssigned)
      : null;

    res.status(200).send(previousMentor);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving previous mentor." });
  }
});
module.exports = router;

