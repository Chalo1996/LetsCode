import { createServer } from "http";

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><title>Greetings,</title></head>");
    res.write(`<body><h1>Hello World!</h1></body>`);
    res.write("</html>");
    return res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write(
      `<body><ul><li>David</li><li>Emmanuel</li><li>Eric</li><li>Ezekiel</li></ul></body>`
    );
    res.write("</html>");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
