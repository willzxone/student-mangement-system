export const sendRequest = async (details) => {
  try {
    const response = await fetch("http://localhost:3000/api/recieveData", {
      method: details.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details.body),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
console.log;
