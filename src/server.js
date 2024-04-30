import express from "express";

const app = express();
const POST = 8000;

// EJS
app.set('view engine', 'ejs'); // express에서 뷰(템플릿) 엔진을 쓸 수 있도록 정해준 것
// 위치
app.set("views", process.cwd() + "/src/client/html"); // const location = process.cwd(); => 현재 파일의 위치
// css,js...등으로 요청이 왔을 때 정적인 파일을 보내주는 미들웨어
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

app.get("/", (req, res) => {
  // console.log("middleware통과X");
  res.render("main");
})
app.get("/introduce", (req, res) => {
  res.render("introduce");
})

// 미들웨어
/* app.use((req, res, next) => {
  // 인증 인가, 로그 등에 쓸 수 있음
  console.log("모든 요청에 대해 실행되는 미들웨어");
  next(); // 다음 미들웨어로 제어를 전달
}); */
// 미들웨어 활용 예
/* const middleware = (req, res, next) => {
  console.log("middleware");
  const data = req.query; // URL에 있는 쿼리를 받아옴
  console.log(data);
  const ok = req.query.ok;
  console.log(ok);
  ok === "true" ? next() : res.send("잘못된 주소입니다."); // 응답 후 라우트 핸들러로 넘어가지 않고 바로 종료
  // http://localhost:8000/test?name=yeonsung&ok=true -> ok가 true일때만 /test요청으로 넘어감
  next();
}; */
/*
app.get("/test", middleware, (req, res) => {
  // 클라이언트가 "/test" 경로로 요청을 보낼 때 middleware함수 실행
  res.send("test");
});
*/
app.listen(POST, () => {
  console.info(`서버 열림 http://localhost:${POST}`);
}) // 서버를 켜두기 위해