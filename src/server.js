import "dotenv/config";
import express from "express";
import { coursePage } from "./controller/webController.js";

const app = express();
const POST = 8000;

app.set('view engine', 'ejs');
app.set("views", process.cwd() + "/src/client/html");

app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));
app.use(express.json());

app.get("/course", coursePage);

// 서버 오픈
app.listen(POST, () => {
  console.info(`서버 열림 http://localhost:${POST}`);
})