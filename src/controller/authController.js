import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const joinUser = async (req, res) => {
  // const userId = req.boidy.userId;
  const { userId, userPassword, userName } = req.body;
  // 1. userId 중복 확인 (데이터베이스에서 찾기)
  const QUERY1 = `SELECT user_no FROM users WHERE user_id = ?`;
  const existUser = await db.execute(QUERY1, [userId]).then((result) => result[0][0]);
  if(existUser) {
    return res.status(400).json({status: "fail", message: "중복된 아이디입니다."});
  }
  // 2. 비밀번호 암호화
  const encryptPassword = await bcrypt.hash(userPassword, 8);
  // console.log(encryptPassword);
  // 3. 회원 저장
  const QUERY2 = `INSERT INTO users (user_id, user_password, user_name) VALUES (?, ?, ?)`;
  await db.execute(QUERY2, [userId, encryptPassword, userName]);
  res.status(201).json({status: "success", message: "회원가입 완료"});

  // console.log(userId, userPassword, userName);
}

export const loginUser = async (req, res) => {
  const { userId, userPassword } = req.body;
  // 1. id에 맞는 사용자 찾기
  const QUERY = `SELECT * FROM users WHERE user_id = ?`
  const user = await db.execute(QUERY, [userId]).then((result) => result[0][0]);
  console.log(user);
  if(!user) {
    return res.status(400).json({status: "fail", message: "아이디와 비밀번호를 확인해 주세요."});
  }
  // 2. 비밀번호 맞는지 확인
  const isPassword = await bcrypt.compare(userPassword, user.user_password);
  // console.log(isPassword);
  if(!isPassword) {
    return res.status(400).json({status: "fail", message: "아이디와 비밀번호를 확인해 주세요."});
  }
  console.log("성공");
  // 3. 회원 인증키 발급키 - jwt(json web token)
  // 3개 : 1. 데이터(user.user_no), 2. 시크릿, 3. 옵션(만료일)
  const accessToken = jwt.sign({ no: user.user_no }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
  console.log(accessToken);

  res.status(200).json({status: "success", message: "로그인 성공", data: { accessToken }});
  // accessToken 30~40m => refresh token 으로 만료
  // refreshToken => 로그 => 서버에서 지움 (redis)
}