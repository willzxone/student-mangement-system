//http://localhost:3000/api/recieveData
import { getConnection } from "../../../db-requests/OpenConnection";
import { closeConnection } from "../../../db-requests/CloseConnection";
import oracledb from "oracledb";

export default async function handler(req, res) {
  // Fetch the data you need from your database
  if (req.method === "PUT") {
    const data = req.body;
    const query = data.query;
    const details = data.details;

    if (data.isReturn) {
      details["cursor"] = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT };
    }
    //GETTING ORACLE CONNECTION
    const orcl = await getConnection();
    try {
      //GETTING TABLE FROM DATABASE AND SENDING ROWS FROM RESULT
      const result = await orcl.execute(query, details);
      if (data.isReturn) {
        const metaData = await result.outBinds.cursor.metaData;
        const rows = await result.outBinds.cursor.getRows();
        res.status(200).json({ metaData, rows });
      } else res.status(200).json(result);
      orcl.commit();
    } catch (err) {
      console.error(err);
      res
        .status(800)
        .send("An error occurred while retrieving data from the database");
    } finally {
      closeConnection(orcl);
    }
  }
}
