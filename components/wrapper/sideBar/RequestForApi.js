export const RequestForApi = (query, details, isReturn) => {
  return {
    method: "PUT",
    query,
    details,
    isReturn,
  };
};
