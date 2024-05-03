import bcrypt from "bcrypt";
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