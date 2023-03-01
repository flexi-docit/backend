const projects = [];

for (let i = 1; i <= 5; i += 1) {
  projects.push({
    name: `Project ${i}`,
    description: `Project ${i} description`,
    lead_id: 5,
  });
}

module.exports = projects;
