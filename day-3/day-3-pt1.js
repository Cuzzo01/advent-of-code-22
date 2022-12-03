const fs = require("fs");

const FindRepeatedItem = (firstCompartment, secondCompartment) => {
  for (const char of firstCompartment) {
    if (secondCompartment.includes(char)) {
      return char;
    }
  }
  return false;
};

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

let sum = 0;
for (const line of lines) {
  const lineArr = [...line];
  const cutoff = lineArr.length / 2;
  const firstCompartment = lineArr.slice(0, cutoff);
  const secondCompartment = lineArr.slice(cutoff);

  const repeatedItem = FindRepeatedItem(firstCompartment, secondCompartment);
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
