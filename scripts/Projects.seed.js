const db = require("../models/index.js");

const projects = [];

for (let i = 1; i <= 5; i += 1) {
  projects.push({
    name: `Project ${i}`,
    description: `Project ${i} description`,
    lead_id: 1,
  });
}

db.Projects.create(projects[0]);

(async () => {
  await db.Projects.bulkCreate(projects);
  console.log("Data seeded successfully!");
  process.exit();
})();
