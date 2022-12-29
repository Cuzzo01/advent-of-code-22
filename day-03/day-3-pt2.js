const fs = require("fs");

const FindItemInCommon = (firstRucksack, secondRucksack, thirdRucksack) => {
  for (const item of firstRucksack) {
    if (secondRucksack.includes(item) && thirdRucksack.includes(item)) return item;
  }
  return false;
};

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length - 2; i += 3) {
  const firstRucksack = [...lines[i]];
  const secondRucksack = [...lines[i + 1]];
  const thirdRucksack = [...lines[i + 2]];

  const repeatedItem = FindItemInCommon(firstRucksack, secondRucksack, thirdRucksack);
  if (!repeatedItem) continue;

  const charCode = repeatedItem.charCodeAt(0);
  let priority = 0;
  if (charCode >= 97) {
    priority = charCode - 96;
  } else {
    priority = charCode - 38;
  }

  sum += priority;
}

console.log(sum);
