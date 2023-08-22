const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentSchema = schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
    mentorAssigned: {
      type: schema.Types.ObjectId,
      default: null,
      ref: "mentor",
    },
  });
  
  const student = mongoose.model("student", studentSchema, "student");
  
  const mentorSchema = schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    studentsAssigned: [
      {
        type: schema.Types.ObjectId,
        ref: "student",
        default: null,
      },
    ],
  });
  
  const mentor = mongoose.model("mentor", mentorSchema, "mentor");

  module.exports ={student,mentor};