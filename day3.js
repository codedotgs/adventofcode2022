const fs = require("fs");

const content = fs.readFileSync("./inputs/day3.txt", "utf8");

const data = content.split("\n");
// a to z are 1 to 26
// A to Z are 27 to 52

// Items present in both compartments
// Sum of the priorities

const splitRucksack = (rucksack) => {
  const compartmentLength = rucksack.length / 2;
  return [
    rucksack.substring(0, compartmentLength),
    rucksack.substring(compartmentLength, rucksack.length),
  ];
};

const getItemsInBothCompartment = (compartment1, compartment2) => {
  const compartmentMapping = fromStringToObj(compartment1);
  const result = [];

  for (let index = 0; index < compartment2.length; index++) {
    const item = compartment2[index];

    if (compartmentMapping[item]) {
      result.push(item);
    }
  }

  return result;
};

const fromStringToObj = (compartment) => {
  const itemObj = {};
  for (const item in compartment) {
    if (compartment.hasOwnProperty.call(compartment, item)) {
      const letter = compartment[item];
      itemObj[letter] = true;
    }
  }
  return itemObj;
};

const shouldBeLowercase = (char) =>
  char.charCodeAt(0) > 96 && char.charCodeAt(0) < 123;

const getValueOfItem = (char) => {
  const initLowercase = -96;
  const initUppercase = -38;
  return shouldBeLowercase(char)
    ? char.charCodeAt(0) + initLowercase
    : char.charCodeAt(0) + initUppercase;
};

// --- Part One ---

const partOne = data.reduce((acc, rucksack) => {
  const [comp1, comp2] = splitRucksack(rucksack);
  const item = getItemsInBothCompartment(comp1, comp2)[0];

  acc += getValueOfItem(item);
  return acc;
}, 0);

console.log({ partOne });

// --- Part Two ---
let partTwo = 0;

for (let i = 0; i < data.length; i += 3) {
  const rucksack1 = data[i];
  const rucksack2 = data[i + 1];
  const rucksack3 = data[i + 2];
  const possibleItems = getItemsInBothCompartment(rucksack1, rucksack2);
  const item = getItemsInBothCompartment(possibleItems.join(), rucksack3)[0];

  partTwo += getValueOfItem(item);
}

console.log({ partTwo });
