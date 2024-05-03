import express from "express";
import { coursePage, introducePage, joinPage, loginPage, mainPage, qrPage } from "./controller/webController.js";
import { getCourseList, qrCheck } from "./controller/courseController.js";
import { joinUser, loginUser } from "./controller/authController.js";
import { neededAuth, notNeededAuth } from "./middleware/auth.js";

const app = express();
const POST = 8000;

// EJS 템플릿 엔진 사용 셋팅
app.set('view engine', 'ejs'); // express에서 뷰(템플릿) 엔진을 쓸 수 있도록 정해준 것
// 위치
app.set("views", process.cwd() + "/src/client/html"); // const location = process.cwd(); => 현재 파일의 위치
// css,js...등으로 요청이 왔을 때 정적인 파일 내보내기 미들웨어
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));
// JSON 형식 변환 미들웨어(요청이 json형식이면 객체로 변환)
app.use(express.json());

// webRouter 라우터 리펙토링 - 기능 변경X 코드 변경
app.get("/", mainPage);
app.get("/introduce", introducePage);
app.get("/course", coursePage);
app.get("/login", loginPage);
app.get("/join", joinPage);
app.get("/qr", qrPage);

// apiRouter
app.get("/api/course", notNeededAuth, getCourseList);
app.post("/api/course", neededAuth, qrCheck );
app.post("/api/join", joinUser);
app.post("/api/login", loginUser);

// 서버 오픈
app.listen(POST, () => {
  console.info(`서버 열림 http://localhost:${POST}`);
})

/* app.post("/test", async (req, res) => {
  const data = req.body;
  // 데이터 베이스 = 비동기
  const QUERY = "INSERT INTO course (course_name, course_latitude, course_longitude, course_qr) VALUES (?, ?, ?, ?)" // sql injection 방지
  await db.execute(QUERY, [data.name, data.latitude, data.longitude, data.qr]);
  console.log(data);
  res.send("ㅎㅇ");
}); */
// 라우터
/* app.get("/", (req, res) => {
  // console.log("middleware통과X");
  res.render("main");
})
app.get("/introduce", (req, res) => {
  res.render("introduce");
}) */
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