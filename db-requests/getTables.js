import oracledb from "oracledb";

export const getTables = async (query) => {
  let orcl;
  let result;
  try {
    orcl = await oracledb.getConnection({
      user: "f219075",
      password: "Waleed77",
      connectString: "orclpdb",
    });
    console.log("Connection successful");
    result = await orcl.execute(query);
  } catch (err) {
    console.error(err);
  } finally {
    if (orcl) {
      try {
        await orcl.close();
        console.log("Connection closed");
      } catch (err) {
        console.error(err);
      }
    }
  }
  return result;
};
