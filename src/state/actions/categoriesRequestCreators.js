import { categoriesRequest as types } from "./types";

const initiate = () => ({ type: types.initiate });
const failure = error => ({ type: types.failure, payload: { error } });
const success = response => ({ type: types.success, payload: { response } });

export default {
  initiate,
  failure,
  success
};
