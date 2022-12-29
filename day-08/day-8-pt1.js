const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const trees = [];
for (const line of lines) {
  const lineArr = [...line];
  trees.push(lineArr);
}

let visibleSet = new Set();

for (let x = 0; x < trees.length; x++) {
  let highestSeen = -1;
  for (let y = 0; highestSeen < 9 && y < trees[x].length; y++) {
    if (trees[x][y] > highestSeen) {
      visibleSet.add([x, y].toString());
      highestSeen = trees[x][y];
    }
  }

  highestSeen = -1;
  for (let y = trees[x].length - 1; highestSeen < 9 && y > 0; y--) {
    if (trees[x][y] > highestSeen) {
      visibleSet.add([x, y].toString());
      highestSeen = trees[x][y];
    }
  }
}

for (let y = 0; y < trees[0].length; y++) {
  let highestSeen = -1;
  for (let x = 0; highestSeen < 9 && x < trees.length; x++) {
    if (trees[x][y] > highestSeen) {
      visibleSet.add([x, y].toString());
      highestSeen = trees[x][y];
    }
  }

  highestSeen = -1;
  for (let x = trees.length - 1; highestSeen < 9 && x > 0; x--) {
    if (trees[x][y] > highestSeen) {
      visibleSet.add([x, y].toString());
      highestSeen = trees[x][y];
    }
  }
}

console.log(visibleSet.size);
