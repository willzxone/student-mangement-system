import { getTables } from "../../../db-requests/getTables";
export default async function handler(req, res) {
  // Fetch the data you need from your database or another source
  const { tableName } = req.query;

  const query = `select * from HR.${tableName}`;
  const data = await getTables(query);

  // Return the data in JSON format
  res.status(200).json(data);
}
