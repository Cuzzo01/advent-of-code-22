const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

const ROCK = "r";
const PAPER = "p";
const SCISSORS = "s";

const GetMoveFromCodedMove = codedMove => {
  switch (codedMove) {
    case "A":
    case "X":
      return ROCK;
    case "B":
    case "Y":
      return PAPER;
    case "C":
    case "Z":
      return SCISSORS;
  }
};

const GetWinPoints = (theirMove, myMove) => {
  if (theirMove === ROCK) {
    if (myMove === PAPER) return 6;
    if (myMove === ROCK) return 3;
    if (myMove === SCISSORS) return 0;
  } else if (theirMove === PAPER) {
    if (myMove === SCISSORS) return 6;
    if (myMove === PAPER) return 3;
    if (myMove === ROCK) return 0;
  } else if (theirMove === SCISSORS) {
    if (myMove === ROCK) return 6;
    if (myMove === SCISSORS) return 3;
    if (myMove === PAPER) return 0;
  }
};

const GetMovePoints = myMove => {
  switch (myMove) {
    case ROCK:
      return 1;
    case PAPER:
      return 2;
    case SCISSORS:
      return 3;
  }
};

let totalPoints = 0;
for (const line of lines) {
  const moves = line.split(" ");
  if (moves.length !== 2) continue;
  const theirMove = GetMoveFromCodedMove(moves[0]);
  const myMove = GetMoveFromCodedMove(moves[1]);

  const winPoints = GetWinPoints(theirMove, myMove);
  totalPoints += winPoints;
  const movePoints = GetMovePoints(myMove);
  totalPoints += movePoints;
}

console.log(totalPoints);
