const db = require("../models/index.js");
// const sequelize = db.sequelize;

const users = [
  {
    email: "achyut.shukla.btech2020@sitpune.edu.in",
    password: "$2b$12$bVRyLy2WQ2e/bI4FPjUE0.mbisO5SJERFg/MMpzJ/cjsmx0yebgKi",
    fullName: "Achyut Shukla",
    role: "Team Lead",
  },
  {
    email: "aditya.desai.btech2020@sitpune.edu.in",
    password: "$2b$12$bVRyLy2WQ2e/bI4FPjUE0.mbisO5SJERFg/MMpzJ/cjsmx0yebgKi",
    fullName: "Aditya Desai",
    role: "Developer",
  },
  {
    email: "antriksh.sharma.btech2020@sitpune.edu.in",
    password: "$2b$12$bVRyLy2WQ2e/bI4FPjUE0.mbisO5SJERFg/MMpzJ/cjsmx0yebgKi",
    fullName: "Antriksh Sharma",
    role: "Developer",
  },
  {
    email: "anupam.muralidharan.btech2020@sitpune.edu.in",
    password: "$2b$12$bVRyLy2WQ2e/bI4FPjUE0.mbisO5SJERFg/MMpzJ/cjsmx0yebgKi",
    fullName: "Anupam Muralidharan",
    role: "Developer",
  },
  {
    email: "ojas.inamdar.btech2020@sitpune.edu.in",
    password: "$2b$12$bVRyLy2WQ2e/bI4FPjUE0.mbisO5SJERFg/MMpzJ/cjsmx0yebgKi",
    fullName: "Ojas Inamdar",
    role: "Module Lead",
  },
];

module.exports = users;
