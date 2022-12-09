const fs = require("fs");

const input = fs.readFileSync("./input-test.txt", "utf-8");
const lines = input.split("\n");

const trees = [];
for (const line of lines) {
  const lineArr = [...line];
  trees.push(lineArr);
}

const FindViewingDistance = ([x,y]) => {

}

const FindTreeScenicScore = ([x, y]) => {
  const treeHight = trees[x][y]

  // down
  for (let offset = 0; trees[x+offset][y] < treeHight; offset++)
}

for (let x = 0; x < trees.length; x++) {
  for (let y = 0; y < trees[x].length; y++) {

  }
}