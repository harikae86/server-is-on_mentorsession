const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const home = (req, res) => {
  res.end("<h1>Hello World, it's Codecool!</h1>");
};

const students = (req, res) => {
  const students = path.join(__dirname, "./data/students.json");
  fs.readFile(students, { encoding: "utf-8" }).then((data) => {
    res.setHeader("Contenty-Type", "application/json");
    res.end(data);
  });
};

const student = (req, res) => {
  const id = req.params.id;
  const students = path.join(__dirname, "./data/students.json");
  fs.readFile(students, { encoding: "utf-8" }).then((data) => {
    const parsed = JSON.parse(data);
    res.setHeader("Contenty-Type", "application/json");
    const filteredStudents = parsed.find(
      (student) => student.id === req.params.id
    );
    res.end(JSON.stringify(filteredStudents));
    // if (filteredStudents === undefined) {
    //   res.statusCode = 404;
    //   return res.end("not found");
    // }
  });
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === "/") {
    return home(req, res);
  }

  if (url === "/api/students") {
    return students(req, res);
  }

  if (url.startsWith("/api/students/")) {
    const parts = url.split("/");
    const last = parts[parts.length - 1];
    req.params = { id: Number(last) };
    return student(req, res);
  }
});

module.exports = server;
