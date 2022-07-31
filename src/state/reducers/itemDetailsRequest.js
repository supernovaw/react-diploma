import { itemDetailsRequest as types } from "../actions/types";

const statusIdle = error => ({ status: { loading: false, error } });
const statusWait = () => ({ status: { loading: true, error: null } });

const defaultState = {
  // 42: { status: {...}, response: {...} }
};

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(types.BASE)) return state;

  const { id, response, error } = payload;

  switch (type) {
    case types.initiate: return { ...state, [id]: { ...statusWait() } };
    case types.failure: return { ...state, [id]: { ...statusIdle(error) } };
    case types.success: return { ...state, [id]: { ...statusIdle(), response } };
  }
  console.warn("unrecognized action with known base: " + type);
  return state;
};
