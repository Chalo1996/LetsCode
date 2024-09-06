import { createServer } from "http";
import { parse } from "querystring";

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><title>Enter Username</title></head>");
    res.write(
      `<body><form action="/create-user" method="POST">
        <input type="text" name="username">
        <button type="submit">Submit</button>
      </form></body>`
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const buffer = [];
    req.on("data", (chunk) => {
      buffer.push(chunk);
    });

    req.on("end", () => {
      const parsedData = Buffer.concat(buffer).toString();
      const message = parse(parsedData).username;
      console.log(message);

      try {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      } catch (error) {
        console.error("Error:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
