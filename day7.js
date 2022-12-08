const fs = require("fs");

const content = fs.readFileSync("./inputs/day7.txt", "utf8");

const data = content.split("\n");

// --- Part One ---
// --- What is the sum of the total sizes of those directories?

const getMapping = (data) => {
  let startIndex = 2;
  const rootMapping = {};
  const sizeMapping = {};
  let currentDirRef = rootMapping;
  let path = [];

  for (let i = startIndex; i < data.length; i++) {
    const line = data[i];

    const [info, name] = line.split(" ");

    if (info === "dir") {
      currentDirRef[name] = [];
      sizeMapping[name] = 0;
    }

    if (info.match(/^(\d*)$/)) {
      currentDirRef[name] = parseInt(info, 10);
      path.forEach((dir) => {
        sizeMapping[dir] += parseInt(info, 10);
      });
    }

    if (line.substring(0, 4) === "$ cd") {
      const dirName = line.substring(5);
      currentDirRef = rootMapping;

      if (dirName === "..") {
        path.pop();
      } else {
        path.push(dirName);
      }

      path.forEach((dir) => {
        currentDirRef = currentDirRef[dir];
      });
    }
  }

  return { rootMapping, sizeMapping };
};

const countSize = (data, mapping, key) => {
  const countMapping = mapping || {};
  let currData = data[key] || data;

  for (const i in currData) {
    const item = currData[i];

    if (typeof item === "object") {
      countSize(item, countMapping, key);
    } else {
      countMapping[key] += item;
    }
  }

  return countMapping;
};

const getResult = (data) => {
  const sizeMapping = {};

  Object.keys(data).forEach((key) => {
    sizeMapping[key] = 0;

    if (typeof data[key] === "number") {
      sizeMapping[key] = data[key];
    }

    countSize(data, sizeMapping, key);
  });

  return Object.values(sizeMapping);
};

const partOne = (data) => {
  const { rootMapping, sizeMapping } = getMapping(data);

  console.log(sizeMapping);
  return Object.entries(sizeMapping).reduce((acc, [path, value]) => {
    console.log({ path, value });
    if (value <= 100000) {
      acc += value;
    }

    return acc;
  }, 0);
};

// --- Part Two ---
// --- How many characters need to be processed before the first start-of-message marker is detected?

const partTwo = () => {
  return null;
};

// ------------------------

console.log({ partOne: partOne(data) });
console.log({ partTwo: partTwo() });
