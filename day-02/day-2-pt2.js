const fs = require("fs");

const ROCK = "r";
const PAPER = "p";
const SCISSORS = "s";

const WIN = "w";
const DRAW = "d";
const LOSE = "l";

const GetMoveFromCodedMove = codedMove => {
  switch (codedMove) {
    case "A":
      return ROCK;
    case "B":
      return PAPER;
    case "C":
      return SCISSORS;
  }
};

const GetResultFromCodedResult = codedResult => {
  switch (codedResult) {
    case "X":
      return LOSE;
    case "Y":
      return DRAW;
    case "Z":
      return WIN;
  }
};

const GetMyMoveFromTheirMoveAndResult = (theirMove, result) => {
  if (theirMove === ROCK) {
    if (result === WIN) return PAPER;
    if (result === DRAW) return ROCK;
    if (result === LOSE) return SCISSORS;
  } else if (theirMove === PAPER) {
    if (result === WIN) return SCISSORS;
    if (result === DRAW) return PAPER;
    if (result === LOSE) return ROCK;
  } else if (theirMove === SCISSORS) {
    if (result === WIN) return ROCK;
    if (result === DRAW) return SCISSORS;
    if (result === LOSE) return PAPER;
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

const input = fs.readFileSync("./input.txt", "utf-8");

const lines = input.split("\n");

let totalPoints = 0;
for (const line of lines) {
  const moves = line.split(" ");
  if (moves.length !== 2) continue;

  const theirMove = GetMoveFromCodedMove(moves[0]);
  const result = GetResultFromCodedResult(moves[1]);
  const myMove = GetMyMoveFromTheirMoveAndResult(theirMove, result);

  const winPoints = GetWinPoints(theirMove, myMove);
  totalPoints += winPoints;
  const movePoints = GetMovePoints(myMove);
  totalPoints += movePoints;
}

console.log(totalPoints);
