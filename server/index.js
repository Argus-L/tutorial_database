const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "tutorial_database",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const skills = req.body.skills;
  const date = req.body.date;
  const source = req.body.source;

  db.query(
    "INSERT INTO tutorials (name, skills, date, source) VALUES (?,?,?,?)",
    [name, skills, date, source],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/tutorials", (req, res) => {
  db.query("SELECT * FROM tutorials", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tutorials WHERE id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("yay");
});
