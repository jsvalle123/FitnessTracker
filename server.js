const express = require("express");
const mongoose = require("mongoose");
const db = require("./models")
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

console.log(process.env.MONGODB_URI);

process.env.MONGODB_URI || 'mongodb://localhost/fitness/workouts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }


// routes
const routes= require("./controller/trackerController.js");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
