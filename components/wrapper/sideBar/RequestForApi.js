export const RequestForApi = (query, details) => {
  return {
    method: "PUT",
    query,
    details,
  };
};
