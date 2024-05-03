import db from "../config/db.js";

// 추가 1
export const coursePage = async (req, res) => {
  const QUERY = "SELECT c.* FROM course c";
  const result = await db.execute(QUERY).then((result) => result[0]);

  res.render("course", { result });
};
