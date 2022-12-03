const fs = require("fs");

const content = fs.readFileSync("./inputs/day2.txt", "utf8");

const data = content.split("\n").map((str) => str.substring(0, 3));
// A for Rock, B for Paper, C for Scissors
// X for Rock, Y for Paper, Z for Scissors
// 1 for Rock, 2 for Paper, 3 for Scissors
// 0 for Loss, 3 for Draw, 6 for Win

/*
A >> Y;
B >> Z;
C >> X;
*/

// --- Part One ---
const movePoints = {
  X: 1,
  Y: 2,
  Z: 3,
};

const winDrawLossMapping = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
    3: "X",
    6: "Y",
    0: "Z",
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
    0: "X",
    3: "Y",
    6: "Z",
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
    6: "X",
    0: "Y",
    3: "Z",
  },
};

const playRockPaperScissors = (player1, player2) => {
  return movePoints[player2] + winDrawLossMapping[player1][player2];
};

const finalScore = data.reduce((acc, currentPlay) => {
  const [player1, player2] = currentPlay.split(" ");
  return acc + playRockPaperScissors(player1, player2);
}, 0);

console.log({ finalScore });

// --- Part Two ---

//  X to lose, Y to Draw, Z to Win
//  0 to lose, 3 to Draw, 6 to Win

const pointsMapping = {
  X: 0,
  Y: 3,
  Z: 6,
};

const followElfGuidance = (player1, player2) => {
  const pointsToGet = pointsMapping[player2];
  const rightMove = winDrawLossMapping[player1][pointsToGet];

  return pointsToGet + movePoints[rightMove];
};

const finalScorePartTwo = data.reduce((acc, currentPlay) => {
  const [player1, player2] = currentPlay.split(" ");

  return acc + followElfGuidance(player1, player2);
}, 0);

console.log({ finalScorePartTwo });
