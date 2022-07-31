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
export const categoriesRequest = generateSubActions("categoriesRequest", [
  "initiate",
  "success",
  "failure"
]);
export const itemsRequest = generateSubActions("itemsRequest", [
  "proceed",
  "success",
  "failure"
]);
export const itemDetailsRequest = generateSubActions("itemDetailsRequest", [
  "initiate",
  "success",
  "failure"
]);
export const cartCount = generateSubActions("cartCount", ["update"]);
