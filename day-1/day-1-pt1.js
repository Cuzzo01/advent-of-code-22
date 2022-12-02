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

let maxAmount = 0;
for (const amount of elfAmounts) {
  if (amount > maxAmount) maxAmount = amount;
}

console.log(maxAmount);
