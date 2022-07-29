function generateSubActions(reducerName, subActions) {
  const result = { BASE: reducerName + ' ' };
  subActions.forEach(sub => result[sub] = result.BASE + sub);
  return result;
}

export const topSalesRequest = generateSubActions("topSalesRequest", [
  "initiate",
  "success",
  "failure"
]);
