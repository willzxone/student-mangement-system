import oracledb from "oracledb";

export const getConnection = async () => {
  let orcl;
  try {
    orcl = await oracledb.getConnection({
      user: "f219075",
      password: "Waleed77",
      connectString: "orclpdb",
    });
    console.log("Connection successful");
  } catch (err) {
    console.error(err);
  }
  return orcl;
};

//result = await orcl.execute(query, details);

//(detail.output_cursor = { dir: oracledb.BIND_OUT, type: oracledb.CURSOR })
