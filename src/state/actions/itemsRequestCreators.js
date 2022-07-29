import { itemsRequest as types } from "./types";

const proceed = (categoryId, offset) => ({ type: types.proceed, payload: { categoryId, offset } });
const failure = (categoryId, error) => ({ type: types.failure, payload: { categoryId, error } });
const success = (categoryId, response) => ({ type: types.success, payload: { categoryId, response } });

export default {
  proceed,
  failure,
  success
};
