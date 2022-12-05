const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const stackRows = [];
let firstInstructionLine = 0;
for (const [index, line] of lines.entries()) {
  if (line.at(1) === "1") {
    firstInstructionLine = index + 2;
    break;
  }
  const row = [];
  for (let i = 0; i < line.length - 1; i += 4) {
    const currentChar = line.at(i);
    const nextChar = line.at(i + 1);

    if (currentChar === "[") {
      row.push(nextChar);
    } else if (currentChar === " ") {
      if (nextChar === " ") row.push("");
    }
  }
  stackRows.push(row);
}

const numStacks = stackRows[0].length;
const stacks = {};
for (let i = 0; i < numStacks; i++) {
  const stack = [];
  for (let j = 0; j < stackRows.length; j++) {
    const char = stackRows[j][i];
    if (char !== "") stack.push(stackRows[j][i]);
  }
  stacks[i + 1] = stack.reverse();
}

for (let i = firstInstructionLine; lines[i]; i++) {
  const line = lines[i];
  const instructionArr = line.split(" ");
  const numToMove = instructionArr[1];
  const fromStackNum = instructionArr[3];
  const toStackNum = instructionArr[5];

  for (let moveNum = 0; moveNum < numToMove; moveNum++) {
    const fromStack = stacks[fromStackNum];
    const val = fromStack.pop();
    stacks[toStackNum].push(val);
  }
}

let solution = "";
for (const [key, value] of Object.entries(stacks)) {
  const top = value.pop();
  solution += top;
}

console.log(solution);
