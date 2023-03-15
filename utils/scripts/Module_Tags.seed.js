const moduleTags = [];

const getRandomPair = (min, max) => {
  let num1 = Math.floor(Math.random() * (max - min + 1) + min);
  let num2 = Math.floor(Math.random() * (max - min + 1) + min);
  return [num1, num2];
};

for (let i = 1; i <= 5; i++) {
  const [min, max] = getRandomPair(1, 5);
  moduleTags.push({
    module_id: min,
    tag_id: max,
  });
}

module.exports = moduleTags;
