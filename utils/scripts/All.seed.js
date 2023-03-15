const users = require("./Users.seed.js");
const projects = require("./Projects.seed.js");
const modules = require("./Modules.seed.js");
const tags = require("./Tags.seed.js");
const moduletags = require("./Module_Tags.seed.js");
const db = require("../../models/index.js");
const Users = db.Users;
const Projects = db.Projects;
const Modules = db.Modules;
const Tags = db.Tags;
const sequelize = db.sequelize;
const ModuleTags = db.Module_Tags;
(async () => {
  await sequelize.transaction(async (transaction) => {
    console.log("creating users");
    await Users.bulkCreate(users, { transaction });
    console.log("users created successfully");

    console.log("creating projects");
    await Projects.bulkCreate(projects, { transaction });
    console.log("projects created successfully");

    console.log("creating modules");
    await Modules.bulkCreate(modules, { transaction });
    console.log("modules created successfully");

    console.log("creating tags");
    await Tags.bulkCreate(tags, { transaction });
    console.log("tags created successfully");

    console.log("creating module tags");
    await ModuleTags.bulkCreate(moduletags, { transaction });
    console.log("module tags created successfully");
  });
  process.exit(0);
})();
