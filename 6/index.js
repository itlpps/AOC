const fs = require("fs");

const data = {
  size1: 4,
  size2: 14,
  solved1: false,
  solved2: false,
  value1: [],
  value2: [],
};

async function index() {
  const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });

  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    resolve(element, index, 1);
    resolve(element, index, 2);

    if (data.solved1 && data.solved2) break;
  }
}

function resolve(element, index, part) {
  if (data[`solved${part}`]) return;

  data[`value${part}`].push(element);

  const size = data[`size${part}`];

  if (data[`value${part}`].length !== size) return false;

  if (validate(data[`value${part}`], size)) {
    console.log(`Resposta ${part}:`, index + 1);
    data[`solved${part}`] = true;
  } else {
    data[`value${part}`].shift();
  }
}

function validate(value, size) {
  return new Set(value).size === size;
}

index();
