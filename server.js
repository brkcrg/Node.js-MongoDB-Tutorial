const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mng_key = process.env.MONGODB.toString();

mongoose.connect(
  `mongodb+srv://mongobrk:${mng_key}@cluster0.d422w.mongodb.net/Teams?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const Schema = mongoose.Schema;
const Team = new Schema({
  name: String,
  year: String,
  adddate: { type: Date, default: Date.now },
  person: {
    //ilişkisel tablol içi tekrar bir schema çmamzıa gerek yok bu şkeilde ilişkilendirebiliyoruz.
    fullname: String,
    goalscore: [],
  },
});

const TeamName = mongoose.model("Team", Team);

//mongodb kullanarak bir API oluşturmak;

app.get("/teams/:limit", (req, res) => {
  let take = req.params.limit;
  TeamName.find()
    .limit(take)
    .exec((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.json(err);
      }
    });
});

// app.get("/teams", (req, res) => {
//   TeamName.find({}, (err, doc) => {
//     if (!err) {
//       res.json(doc);
//     } else {
//       res.json(err);
//     }
//   });
// });

// TeamName.find()
//   .select("name")
//   .exec((err, doc) => {
//     if (!err) {
//       console.log(doc);
//     }
//   });

// TeamName.deleteMany({}, (err, doc) => {
//   if (!err) {
//     console.log("deleted");
//   }
// });

// TeamName.find({ name: "Fb" }, (err, doc) => {
//   if (!err) {
//     console.log(doc);
//   }
// });

// TeamName.find({}, (err, doc) => {
//   if (!err) {
//     doc[1].name = "Fb";
//     doc[1].save((error, document) => {
//       if (!error) {
//         console.log("succsess!!");
//         console.log(document);
//       }
//     });
//   }
// });

//instance
var name = new TeamName({
  name: "Fenerbahçe",
  year: 1907,
  "person.fullname": "Alex De Souza",
  "person.goalscore": [50, 60, 70],
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
