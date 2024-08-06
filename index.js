require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 2500;

app.use(cors());

const loginRoute = require('./routes/loginroutes');
const notFound = require("./middleware/notFound.js");



app.use(express.json()); //allows access to the req.body in our app

app.use('/api/loginRoute', loginRoute);
app.use(notFound);


// app.listen(port, () => {
//   console.log(Server running on Port ${port});
// });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); //What went on here clarity needed
    console.log("DB Connected!");
    app.listen(port, () => {
      console.log(`Server running on Port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();