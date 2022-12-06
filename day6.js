const fs = require("fs");

const content = fs.readFileSync("./inputs/day6.txt", "utf8");

const data = content.split("\n");

// --- Part One ---
// --- How many characters need to be processed before the first start-of-packet marker is detected?
const isValid = (word) => {
  let mapping = {};
  let areCharsUnique = true;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];

    if (mapping[letter]) {
      areCharsUnique = false;
      break;
    } else {
      mapping[letter] = true;
    }
  }
  return areCharsUnique;
};

const getResult = (numberOfChars) => {
  return data.map((line) => {
    for (let i = 0; i < line.length; i++) {
      const pattern = line.substring(i, i + numberOfChars);

      if (isValid(pattern)) {
        return i + numberOfChars;
      }
    }
  });
};

const partOne = () => {
  return getResult(4);
};

// --- Part Two ---
// --- How many characters need to be processed before the first start-of-message marker is detected?

const partTwo = () => {
  return getResult(14);
};

// ------------------------

console.log({ partOne: partOne() });
console.log({ partTwo: partTwo() });
