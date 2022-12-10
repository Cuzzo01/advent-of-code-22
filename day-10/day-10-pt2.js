const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

let cycleCounter = 0;
let reg = 1;

const display = [[]];

const IncrementCycleCounter = () => {
  const horizontalPos = cycleCounter % 40;
  const verticalPos = Math.floor(cycleCounter / 40);
  const cellIsLit = Math.abs(reg - horizontalPos) <= 1;
  if (!display[verticalPos]) display[verticalPos] = [];
  display[verticalPos].push(cellIsLit ? "#" : ".");

  cycleCounter++;
};

for (const line of lines) {
  const lineArr = line.split(" ");
  if (lineArr[0] === "noop") {
    IncrementCycleCounter();
  } else {
    IncrementCycleCounter();
    IncrementCycleCounter();
    const toAdd = parseInt(lineArr[1]);
    reg += toAdd;
  }
}

let toPrint = "";
for (const displayLine of display) {
  for (const displayChar of displayLine) {
    toPrint += displayChar;
  }
  toPrint += "\n";
}
console.log(toPrint);
