const db = require("../models/index.js");

const projects = [
  {
    name: "Project 1",
    description: "Project 1 description",
    lead_id: 1,
  },
  {
    name: "Project 2",
    description: "Project 2 description",
    lead_id: 1,
  },
  {
    name: "Project 3",
    description: "Project 3 description",
    lead_id: 1,
  },
  {
    name: "Project 4",
    description: "Project 4 description",
    lead_id: 1,
  },
  {
    name: "Project 5",
    description: "Project 5 description",
    lead_id: 1,
  },
];

(async () => {
  await db.Projects.bulkCreate(projects);
  console.log("Data seeded successfully!");
  process.exit();
})();
