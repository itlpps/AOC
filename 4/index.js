const fs = require("fs");

async function index() {
  const input = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((b) => !!b);
  let count = 0;
  let count2 = 0;
  for (const item of input) {
    count += isFullyOverlap(item);
    count2 += isPartialOverlap(item);
  }

  console.log("Resposta 1:", count);
  console.log("Resposta 2:", count2);
}

function isFullyOverlap(value) {
  const [a1, a2, a3, a4] = handleItem(value);

  if (a1 <= a3 && a2 >= a4) return true;
  if (a1 >= a3 && a2 <= a4) return true;

  return false;
}

function isPartialOverlap(value) {
  const [a1, a2, a3, a4] = handleItem(value);

  if (a1 === a3 || a1 === a4) return true;
  if (a2 === a3 || a2 === a4) return true;

  if (a1 < a3 && a2 < a3) return false;
  if (a1 > a4 && a2 > a4) return false;

  if (a1 < a3 && a2 > a3) return true;
  if (a1 > a3 && a2 > a3) return true;

  return false;
}

function handleItem(value) {
  const [s1, s2] = value.split(",").map((x) => x.split("-").map(Number));
  return [...s1, ...s2];
}

index();
