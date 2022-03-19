const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://mongobrk:6543@cluster0.d422w.mongodb.net/Teams?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const Schema = mongoose.Schema;
const Team = new Schema({
  name: String,
  year: String,
  adddate: { type: Date, default: Date.now },
});

const TeamName = mongoose.model("Team", Team);

//instance
var name = new TeamName({
  name: "Fenerbahçe",
  year: 1907,
});

//save
name.save((err, doc) => {
  if (!err) {
    console.log("success");
    console.log(doc); //savelenen datayı mongodb bu şekilde bize iletiyo.
  } else {
    console.log(err);
  }
});

//node.js ile mongo db arasında bir veri transferi gercekleştiriyoruz.

app.get("/", (req, res) => {
  res.send("MongoDB");
});
app.listen(3000); //3000 portunu dinliyoruz.
