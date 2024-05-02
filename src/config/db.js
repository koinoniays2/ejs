import "dotenv/config";
import mysql from "mysql2";

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

// DB 연결
// 커넥션(쿼리요청 1번 1커넥션(TCP연결 계속) -> 비용문제), 커넥션 풀(서버 메모리)에 담가두는 방식
const db = mysql.createPool(config).promise();

export default db;