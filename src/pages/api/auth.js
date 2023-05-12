import { getConnection } from "../../../db-requests/OpenConnection";
import { closeConnection } from "../../../db-requests/CloseConnection";
import oracledb from "oracledb";
export default async function handler(req, res) {
  // Fetch the data you need from your database
  if (req.method === "PUT") {
    const data = req.body;

    const query = `BEGIN GET_CREDENTIALS(:username, :password, :table, :cursor); END;`;
    const details = {
      username: data.username,
      password: data.password,
      table: getTable(data.username),
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    //GETTING ORACLE CONNECTION
    const orcl = await getConnection();

    try {
      //GETTING TABLE FROM DATABASE AND SENDING ROWS FROM RESULT
      const result = await orcl.execute(query, details);
      const userData = await result.outBinds.cursor.getRows(1);
      res.status(200).json(userData);
    } catch (err) {
      console.log("IN API RESULT ERROR: ");
      console.error(err);
      res
        .status(800)
        .send("An error occurred while retrieving data from the database");
    } finally {
      closeConnection(orcl);
    }
  }
}

const getTable = (username) => {
  switch (username.toLowerCase().substring(0, 4)) {
    case "std-":
      return "student";
    case "tch-":
      return "teacher";
    case "adm-":
      return "admin";
  }
};
