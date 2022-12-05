const fs = require("fs");

// X = rock | Y = paper | Z = scissors
const points = {
  "A X": 1 + 3, // 1 rock + 3 draw
  "A Y": 2 + 6, // 2 paper + 6 win
  "A Z": 3 + 0, // 3 scissors + 0 lose
  "B X": 1 + 0, // 1 rock + 0 lose
  "B Y": 2 + 3, // 2 paper + 3 draw
  "B Z": 3 + 6, // 3 scissors + 6 win
  "C X": 1 + 6, // 1 rock + 6 win
  "C Y": 2 + 0, // 2 paper + 0 lose
  "C Z": 3 + 3, // 3 scissors + 3 draw
};

// X = lose | Y = draw | Z = win
const points2 = {
  "A X": 3 + 0, // 3 scissors + 0 lose
  "A Y": 1 + 3, // 1 rock + 3 draw
  "A Z": 2 + 6, // 2 paper + 6 win
  "B X": 1 + 0, // 1 rock + 0 lose
  "B Y": 2 + 3, // 2 paper + 3 draw
  "B Z": 3 + 6, // 3 scissors + 6 win
  "C X": 2 + 0, // 2 paper + 0 lose
  "C Y": 3 + 3, // 3 scissors + 3 draw
  "C Z": 1 + 6, // 1 rock + 6 win
};

function index() {
  const matches = fs
    .readFileSync("input.txt", { encoding: "utf8" })
    .split("\n")
    .filter((x) => !!x);

  let result = 0;
  let result2 = 0;
  for (const match of matches) {
    result += points[match];
    result2 += points2[match];
  }

  console.log("Resposta 1:", result);
  console.log("Resposta 2:", result2);
}

index();
