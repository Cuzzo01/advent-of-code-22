const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

let cycleCounter = 0;
let reg = 1;

const strengths = [];

const MeasureSignal = () => {
  if ((cycleCounter + 20) % 40 === 0) {
    strengths.push(cycleCounter * reg);
  }
};

for (const line of lines) {
  const lineArr = line.split(" ");
  if (lineArr[0] === "noop") {
    cycleCounter++;
    MeasureSignal();
  } else {
    cycleCounter++;
    MeasureSignal();
    cycleCounter++;
    MeasureSignal();
    const toAdd = parseInt(lineArr[1]);
    reg += toAdd;
  }
}

console.log(strengths.reduce((acc, cur) => acc + cur));
