const express = require("express");
const { dbConnect } = require("./dbconnect/dbconnect");
const studentrouter = require("./assigning/student");
const mentorrouter = require("./assigning/mentor");
const newMentor = require("./assigning/assigning");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("server is working");
  });

app.use("/student",studentrouter);
app.use("/mentor",mentorrouter);
app.use("/assigning",newMentor);
app.listen(8000,async(req,res)=>{
  await dbConnect();
  console.log("The server is running in the port 8000");
});