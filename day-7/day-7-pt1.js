const fs = require("fs");

const Type = {
  Directory: "d",
  File: "f",
};

const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const GetFileSystemEntry = (type, name, size, items) => {
  return {
    _Type: type,
    _Name: name,
    _Size: size,
    _Items: type === Type.Directory ? [] : undefined,
  };
};

const GetCurrentDir = (fileSystem, currentPath) => {
  let dir = fileSystem;
  if (currentPath.length !== 1) {
    const newPath = [...currentPath];
    newPath.shift();
    for (const section of newPath) {
      dir = dir._Items.find(a => a._Name === section);
    }
  }
  return dir;
};

const AddDirToCurrentDir = (fileSystem, currentPath, dirName) => {
  const currentDir = GetCurrentDir(fileSystem, currentPath);
  currentDir._Items.push(GetFileSystemEntry(Type.Directory, dirName));
};

const AddFileToCurrentDir = (fileSystem, currentPath, fileName, fileSize) => {
  const currentDir = GetCurrentDir(fileSystem, currentPath);
  currentDir._Items.push(GetFileSystemEntry(Type.File, fileName, fileSize));
};

const smallDirs = [];
const PopulateDirectorySizes = (fileSystem, currentPath) => {
  const currentDir = GetCurrentDir(fileSystem, currentPath);
  let sum = 0;
  for (const item of currentDir._Items) {
    if (item._Type === Type.Directory) {
      PopulateDirectorySizes(fileSystem, [...currentPath, item._Name]);
    }
    sum += item._Size;
  }
  if (sum < 100000) smallDirs.push([currentPath, sum]);
  currentDir._Size = sum;
};

let currentPath = [];
const fileSystem = GetFileSystemEntry(Type.Directory, "root");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineArr = line.split(" ");
  if (lineArr[0] === "$") {
    const command = lineArr[1];
    if (command === "cd") {
      if (lineArr[2] === "/") {
        currentPath = ["root"];
      } else if (lineArr[2] === "..") {
        currentPath.pop();
      } else {
        currentPath.push(lineArr[2]);
      }
    }
  } else if (lineArr[0] === "dir") {
    AddDirToCurrentDir(fileSystem, currentPath, lineArr[1]);
  } else {
    const fileSize = parseInt(lineArr[0]);
    const fileName = lineArr[1];
    AddFileToCurrentDir(fileSystem, currentPath, fileName, fileSize);
  }
}

PopulateDirectorySizes(fileSystem, ["root"]);

let sum = 0;
for (const smallDir of smallDirs) {
  sum += smallDir[1];
}
console.log(sum);
