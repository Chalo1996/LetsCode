import express from "express";
import path from "path";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
