export const closeConnection = async (orcl) => {
  if (orcl) {
    try {
      await orcl.close();
      console.log("Connection closed");
    } catch (err) {
      console.error(err);
    }
  }
};
