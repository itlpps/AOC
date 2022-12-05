const fs = require("fs");

function index() {
  const data = fs.readFileSync("input.txt", { encoding: "utf8" });
  const calories = data
    .split("\n\n")
    .map((x) => x.split("\n").reduce((a, b) => +a + +b, 0));

  calories.sort((a, b) => a - b);

  const maxIndex = calories.length - 1;

  console.log("Resposta 1:", calories[maxIndex]);
  console.log(
    "Resposta 2:",
    calories[maxIndex] + calories[maxIndex - 1] + calories[maxIndex - 2]
  );
}

index();
