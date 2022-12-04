const fs = require("fs");

const content = fs.readFileSync("./inputs/day4.txt", "utf8");

const data = content.split("\n");

const getStartAndEnd = (str) => str.split("-").map((num) => parseInt(num, 10));
const formatToStartEnd = (nums) => ({ start: nums[0], end: nums[1] });

// --- Part One ---
// --- In how many assignment pairs does one range fully contain the other?

const isBetween = (elf1, elf2) => {
  return (
    (elf1.start === elf1.end &&
      elf1.start >= elf2.start &&
      elf1.end <= elf2.end) ||
    (elf1.start >= elf2.start && elf1.end <= elf2.end)
  );
};

const partOne = data.reduce((acc, line) => {
  const rawElves = line.split(",");

  const [elf1, elf2] = rawElves.map((rawElf) =>
    formatToStartEnd(getStartAndEnd(rawElf))
  );

  if (isBetween(elf1, elf2) || isBetween(elf2, elf1)) {
    acc += 1;
  }

  return acc;
}, 0);

console.log({ partOne });

// --- Part Two ---
// In how many assignment pairs do the ranges overlap?

const isOverlap = (elf1, elf2) => {
  return (
    (elf1.start <= elf2.start && elf1.end >= elf2.end) ||
    (elf1.start <= elf2.start && elf1.end >= elf2.start)
  );
};

const partTwo = data.reduce((acc, line) => {
  const rawElves = line.split(",");

  const [elf1, elf2] = rawElves.map((rawElf) =>
    formatToStartEnd(getStartAndEnd(rawElf))
  );

  if (isOverlap(elf1, elf2) || isOverlap(elf2, elf1)) {
    acc += 1;
  }

  return acc;
}, 0);

console.log({ partTwo });
