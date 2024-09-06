import { createServer } from "http";
import requestHandler from "./routes.js";

const server = createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
