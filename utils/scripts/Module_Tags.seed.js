const moduleTags = [];

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    moduleTags.push({
      module_id: i + 1,
      tag_id: j + 1,
    });
  }
}

module.exports = moduleTags;
