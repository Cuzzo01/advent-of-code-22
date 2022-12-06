const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const ArrayValuesAreUnique = arr => {
  return new Set(arr).size === arr.length;
};

const last4Chars = [];
for (const [index, character] of [...lines[0]].entries()) {
  last4Chars.push(character);
  if (last4Chars.length < 4) continue;
  if (ArrayValuesAreUnique(last4Chars)) {
    console.log(index + 1);
    return;
  }
  last4Chars.shift();
}
