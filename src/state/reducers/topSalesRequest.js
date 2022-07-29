import { topSalesRequest as types } from "../actions/types";

const statusIdle = error => ({ status: { loading: false, error } });
const statusWait = () => ({ status: { loading: true, error: null } });

const defaultState = {
  status: statusIdle(),
  response: null
};

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(types.BASE)) return state;

  switch (type) {
    case types.initiate: return { ...state, ...statusWait() };
    case types.failure: return { ...state, ...statusIdle(payload.error) };
    case types.success: return { ...state, ...statusIdle(), response: payload.response };
  }
  console.warn("unrecognized action with known base: " + type);
  return state;
};
