import path from "path";
import fs from "fs";

export default function clearImage(filePath) {
  filePath = path.join(filePath);
  fs.unlink(filePath, (err) => console.log(err));
}
