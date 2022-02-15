const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs/promises");

app.use(express.json());

app.get("/", (req, res) => {
  res.end("<h1>Hello World, it's Codecool!</h1>");
});

app.get("/api/students", (req, res) => {
  const students = path.join(__dirname, "./data/students.json");
  fs.readFile(students, { encoding: "utf-8" }).then((data) => {
    res.set("Content-Type", "application/json").end(data);
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const students = path.join(__dirname, "./data/students.json");
  fs.readFile(students, { encoding: "utf-8" }).then((data) => {
    const parsed = JSON.parse(data);
    const filteredStudents = parsed.find((student) => student.id === id);
    return res.json(filteredStudents);
    //return res.status(404).end()
  });
});

app.post("/api/students", (req, res) => {
  const students = path.join(__dirname, "./data/students.json");
  fs.readFile(students, { encoding: "utf-8" })
    .then((data) => {
      const parsed = JSON.parse(data);
      parsed.push(req.body);
      return fs.writeFile(students, JSON.stringify(parsed));
    })
    .then(() => {
      res.status(201).end();
    });
});

module.exports = app;
