const fs = require("fs");

async function index() {
  const bags = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((b) => !!b);

  part1(bags);
  part2(bags);
}

function part1(bags) {
  let sum = 0;
  for (const bag of bags) {
    const [c1, c2] = [
      bag.substring(0, bag.length / 2),
      bag.substring(bag.length / 2),
    ];
    for (const item of c1)
      if (c2.includes(item)) {
        sum += getValueItem(item);
        break;
      }
  }

  console.log("Resposta 1:", sum);
}

function part2(bags) {
  let sum = 0;
  const groups = makeBatch(bags, 3);
  for (const [b1, b2, b3] of groups)
    for (const item of b1)
      if (b2.includes(item) && b3.includes(item)) {
        sum += getValueItem(item);
        break;
      }

  console.log("Resposta 2:", sum);
}

function getValueItem(item) {
  const code = item.charCodeAt();
  if (code >= 97) return code - 96;
  return code - 38;
}

function makeBatch(array, quantity) {
  const final = [];
  let temp = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    temp.push(element);
    if (!array[index + 1] || (index + 1) % quantity === 0) {
      final.push([...temp]);
      temp = [];
    }
  }
  return final;
}

index();
