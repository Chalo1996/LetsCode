import fs from "fs";
import { parse } from "querystring";

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body><form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">Send</button>
        </form></body>`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("CHUNK ", body);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("PARSED", parsedBody);
      const message = parse(parsedBody).message || "Default message";
      console.log("MESSAGE", message);

      // Asynchronously write to file
      fs.appendFile("message.txt", `${message}\n`, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.statusCode = 500;
          return res.end("Internal Server Error");
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello World</h1></body>");
    res.write("</html>");
    res.end();
  }
};

export default requestHandler;
