const modules = [];

for (let i = 1; i <= 10; i += 1) {
  modules.push({
    name: `Module ${i}`,
    description: `Module Description ${1}`,
    lead_id: 5,
    project_id: 1,
  });
}

module.exports = modules;
