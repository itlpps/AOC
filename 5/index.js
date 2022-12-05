const fs = require("fs");

async function index() {
  const input = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => !!x);

  const originalStacks = getStacks(input);
  const stacks1 = JSON.parse(JSON.stringify(originalStacks));
  const stacks2 = JSON.parse(JSON.stringify(originalStacks));

  for (let item of input) {
    if (item.startsWith("move")) {
      const [quantity, from, to] = item.match(/\d+/g);
      moveSingleItem(stacks1, quantity, from, to);
      moveManyItems(stacks2, quantity, from, to);
    }
  }

  let result1 = "";
  let result2 = "";
  for (const key in originalStacks) {
    const element1 = stacks1[key][0];
    const element2 = stacks2[key][0];
    result1 += element1;
    result2 += element2;
  }

  console.log("Resposta 1:", result1);
  console.log("Resposta 2:", result2);
}

function moveSingleItem(stacks, quantity, from, to) {
  for (let index = 0; index < quantity; index++) {
    const item = stacks[from].shift();
    stacks[to].unshift(item);
  }
}

function moveManyItems(stacks, quantity, from, to) {
  const items = stacks[from].splice(0, quantity);
  stacks[to].unshift(...items);
}

function getStacks(input) {
  const batchs = [];
  for (const item of input) {
    if (item.startsWith("move") || item.startsWith(" 1")) continue;
    batchs.push(makeBatch(item.split(""), 4));
  }

  const stacks = {};
  for (const batch of batchs) {
    for (let index = 0; index < batch.length; index++) {
      const elements = batch[index];
      for (const item of elements) {
        if (!item.trim() || ["[", "]"].includes(item.trim())) continue;

        if (!stacks[index + 1]) stacks[index + 1] = [item];
        else stacks[index + 1].push(item);
      }
    }
  }
  return stacks;
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
