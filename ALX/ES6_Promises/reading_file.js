const fs = require("fs");

const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      data ? resolve(data) : reject(err);
    });
  });
};

const readFileSync = async (path) => {
  try {
    const data = await readFilePromise(path);
    console.log(data.toString());
  } catch (err) {
    console.error(err);
  }
};

readFileSync("foor.txt");