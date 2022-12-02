const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

const elfAmounts = [];
let currentAmount = 0;
for (const line of lines) {
  if (line === "") {
    elfAmounts.push(currentAmount);
    currentAmount = 0;
  } else {
    const amount = parseInt(line);
    currentAmount += amount;
  }
}

elfAmounts.sort((a, b) => b - a);
const topThree = elfAmounts.slice(0, 3);
const sum = topThree.reduce((acc, cur) => acc + cur);

console.log(sum);
