const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://harimurugan:hari763979@cluster0.x7iovaa.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    );
    console.log("DB is Connected");
  } catch (e) {
    console.log(e.message, "error in connecting db");
  }
};

module.exports= {dbConnect};