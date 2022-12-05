const fs = require("fs");

const content = fs.readFileSync("./inputs/day5.txt", "utf8");

const data = content.split("\n\n");

const [rawData, rawMoves] = data;

// --- Part One ---
// --- After the rearrangement procedure completes, what crate ends up on top of each stack?

const convertToStack = (rawData) => {
  const stacks = {};
  const mapping = [];
  const headData = rawData[rawData.length - 1];

  for (let i = 0; i < headData.length; i++) {
    if (headData[i] !== " ") {
      mapping.push([parseInt(headData[i], 10), i]);
    }
  }

  for (let index = rawData.length - 2; index >= 0; index--) {
    const line = rawData[index];

    mapping.forEach(([key, charIndex]) => {
      if (line[charIndex] !== " ") {
        const currStack = stacks[key] || [];
        currStack.push(line[charIndex]);
        stacks[key] = currStack;
      }
    });
  }

  return stacks;
};

const formatMoves = (rawMoves) => {
  return rawMoves.split("\n").map((line) => {
    const splitLine = line.split(" ");

    return {
      nbCrates: parseInt(splitLine[1], 10),
      from: parseInt(splitLine[3], 10),
      to: parseInt(splitLine[5], 10),
    };
  });
};

const getResult = (stacks) => {
  return Object.entries(stacks)
    .reduce((acc, [, currStack]) => {
      acc.push(currStack.pop());
      return acc;
    }, [])
    .join("");
};

const partOne = () => {
  const splittedRawData = rawData.split("\n");
  const stacks = convertToStack(splittedRawData);
  const moves = formatMoves(rawMoves);

  moves.forEach((move, i) => {
    const indexStart = stacks[move.from].length - move.nbCrates;
    const cratesToMove = stacks[move.from].splice(indexStart, move.nbCrates);

    for (let index = cratesToMove.length - 1; index >= 0; index--) {
      const crate = cratesToMove[index];
      stacks[move.to].push(crate);
    }
    // console.table(stacks);
  });

  return getResult(stacks);
};

// --- Part Two ---
// --- After the rearrangement procedure completes, what crate ends up on top of each stack?

const partTwo = () => {
  const splittedRawData = rawData.split("\n");
  const stacks = convertToStack(splittedRawData);
  const moves = formatMoves(rawMoves);

  moves.forEach((move, i) => {
    const indexStart = stacks[move.from].length - move.nbCrates;
    const cratesToMove = stacks[move.from].splice(indexStart, move.nbCrates);
    stacks[move.to].push(...cratesToMove);
    // console.table(stacks);
  });

  return getResult(stacks);
};

console.log({ partOne: partOne() });
console.log({ partTwo: partTwo() });
