const fs = require("fs");

async function index() {
  const input = fs
    .readFileSync("./input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter((x) => !!x);

  const originalDirs = makeDirStruct(input);

  const rootDir = originalDirs[Object.keys(originalDirs)[0]];
  sumSizeSubDirs(rootDir, originalDirs);

  part1(originalDirs);
  part2(originalDirs);
}

function part1(originalDirs) {
  let sum = 0;
  for (const dir in originalDirs) {
    const element = originalDirs[dir];
    if (element.size <= 100000) {
      sum += element.size;
    }
  }
  console.log("Resposta 1:", sum);
}

function part2(originalDirs) {
  const rootDir = originalDirs[Object.keys(originalDirs)[0]];
  const spaceTotal = 70000000;
  const attSize = 30000000;
  const spaceAvailable = spaceTotal - rootDir.size;
  const spaceNeeded = Math.abs(spaceAvailable - attSize);

  let toDelete = {};
  for (const dir in originalDirs) {
    const element = originalDirs[dir];
    if (element.size >= spaceNeeded) {
      if (element.size > toDelete.size) continue;
      toDelete = element;
    }
  }
  console.log("Resposta 2:", toDelete);
}

function sumSizeSubDirs(element, dirs) {
  if (!element.subDirs) return element.size;

  for (const subDir of element.subDirs)
    element.size += sumSizeSubDirs(dirs[element.path + "/" + subDir], dirs);

  return element.size;
}

function makeDirStruct(input) {
  const dirs = {};
  let stackDirs = [];
  for (const command of input) {
    if (command === "$ cd ..") {
      stackDirs.pop();
      continue;
    }

    let currentFolder = stackDirs[stackDirs.length - 1] || "";
    let path = stackDirs.join("/");
    if (command.startsWith("$ cd ")) {
      currentFolder = command.replace("$ cd ", "");
      stackDirs.push(currentFolder);
      path = stackDirs.join("/");
      dirs[path] = {
        dir: currentFolder,
        files: [],
        subDirs: [],
        size: 0,
        path,
        ...dirs[currentFolder],
      };
    }

    if (command.startsWith("$")) continue;

    if (command.startsWith("dir"))
      dirs[path].subDirs.push(command.replace("dir ", ""));
    else {
      const [size, name] = command.split(" ");
      dirs[path].files.push({ size: +size, name });
      dirs[path].size += +size;
    }
  }

  return dirs;
}

index();
