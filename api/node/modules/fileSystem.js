/**
 * fs: file system module of node js, used for file operations
 * like create, read, update, delete
 * synchronous: blocking operation
 * asynchronous: non-blocking operation
 */

import fs from "fs";

// 1. Synchronous method

// Read file
// const result = fs.readFileSync("data/data.txt", "utf8");
// console.log(result);

// const image = fs.readFileSync("data/cat.avif", "base64");
// console.log(image);

// Write file
// fs.writeFileSync("data/file.txt", "Additional content.");
// fs.writeFileSync("data/data.json", JSON.stringify({ hello: "world" }));

// Update file
// fs.appendFileSync("data/file.txt", "This is newly appended.");

// Delete file
// fs.rmSync("data/data.json");

// fs.mkdirSync("myfolder");

// 2. Aynchronous method
// Read file
console.log("File before");

fs.readFile("data/data.txt", "utf8", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

console.log("File after");

// Write file
fs.writeFile("data/data.json", JSON.stringify({ name: "Ram" }), () => {
  console.log("File written successful.");
});

// Update file
fs.appendFile("data/data.json", JSON.stringify({ age: "20" }), () => {
  console.log("File update successful.");
});
// Delete file
fs.rm("data/data.json")
