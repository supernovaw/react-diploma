import { itemDetailsRequest as types } from "./types";

const initiate = id => ({ type: types.initiate, payload: { id } });
const failure = (id, error) => ({ type: types.failure, payload: { id, error } });
const success = (id, response) => ({ type: types.success, payload: { id, response } });

export default {
  initiate,
  failure,
  success
};
