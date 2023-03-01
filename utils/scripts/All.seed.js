const users = require("./Users.seed.js");
const projects = require("./Projects.seed.js");
const modules = require("./Modules.seed.js");
const db = require("../../models/index.js");
const Users = db.Users;
const Projects = db.Projects;
const Modules = db.Modules;

(async () => {
  console.log("creating users");
  await Users.bulkCreate(users);
  console.log("users created successfully");

  console.log("creating projects");
  await Projects.bulkCreate(projects);
  console.log("projects created successfully");

  console.log("creating modules");
  await Modules.bulkCreate(modules);
  console.log("modules created successfully");

  process.exit(0);
})();
