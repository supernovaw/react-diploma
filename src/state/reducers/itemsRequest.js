import { itemsRequest as types } from "../actions/types";

const statusIdle = error => ({ status: { loading: false, error } });
const statusWait = () => ({ status: { loading: true, error: null } });

const defaultState = {
  categoryId: 0,
  status: statusIdle(),
  loaded: []
  // can have endReached: true
};

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(types.BASE)) return state;

  const categoryId = payload.categoryId;
  const clearLoaded = categoryId !== state.categoryId;
  const loadedPrev = (!clearLoaded && state.loaded) || [];

  switch (type) {
    case types.proceed: return { categoryId, ...statusWait(), loaded: loadedPrev };
    case types.failure: return { categoryId, ...statusIdle(payload.error), loaded: loadedPrev };
    case types.success: return {
      categoryId, ...statusIdle(),
      loaded: [...loadedPrev, ...payload.response],
      endReached: payload.response.length < 6
    };
  }
  console.warn("unrecognized action with known base: " + type);
  return state;
};
