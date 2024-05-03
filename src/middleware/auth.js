import jwt from "jsonwebtoken";
import db from "../config/db.js";

// 토큰이 있으면 유저 정보 넣어줌, 없으면 안넣어줌
export const notNeededAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization"); // api요청할 때 headers의 키[bearer token값]
  const token = authHeader.split(" ")[1]; // 토큰값만 가져옴
  if(token && token != "null") {
    // 토큰값, 시크릿값, 콜백함수
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decode) => {
      if(error) {
        console.error("JWT 검증 에러");
        return res.status(403).json({status: "fail", message: "JWT 검증 실패"});
      }
      console.log(decode.no);
      // user 찾기
      const QUERY = "SELECT * FROM users WHERE user_no = ?";
      const user = await db.execute(QUERY, [decode.no]).then((result) => result[0][0]);
      req.user = user;
      next();
    });
  } else {
    next();
  }
};
// 토큰이 있으면 유저정보 넣어줌, 없으면 통과안됨(로그인 해야 들어갈 수 있는 페이지)