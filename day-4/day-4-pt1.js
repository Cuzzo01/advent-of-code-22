const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const DoSetsFullyOverlap = (firstSet, secondSet) => {
  if (firstSet[0] <= secondSet[0] && firstSet[1] >= secondSet[1]) return true;
  if (secondSet[0] <= firstSet[0] && secondSet[1] >= firstSet[1]) return true;
  return false;
};

let overlappingSets = 0;
for (const line of lines) {
  if (line.length === 0) continue;
  const sets = line.split(",");
  const firstSet = sets[0].split("-").map(i => parseInt(i));
  const secondSet = sets[1].split("-").map(i => parseInt(i));

  if (DoSetsFullyOverlap(firstSet, secondSet)) overlappingSets++;
}

console.log(overlappingSets);
