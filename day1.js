const fs = require("fs");

const content = fs.readFileSync("./inputs/day1.txt", "utf8");

const inventory = content.split("\n");

const totalCaloriesByElf = [];
let calories = 0;

for (let i = 0; i < inventory.length; i++) {
  if (!inventory[i].length) {
    totalCaloriesByElf.push(calories);
    calories = 0;
  } else {
    calories += parseInt(inventory[i], 10);
  }
}

const highest = Math.max(...totalCaloriesByElf);

console.log({ highest });

const top3 = [0, 0, 0];
for (let i = 0; i < totalCaloriesByElf.length; i++) {
  let minimal = Math.min(...top3);
  if (minimal < totalCaloriesByElf[i]) {
    minimalIndex = top3.indexOf(minimal);
    top3[minimalIndex] = totalCaloriesByElf[i];
  }
}

console.log({ top3 });
console.log(top3[0] + top3[1] + top3[2]);
