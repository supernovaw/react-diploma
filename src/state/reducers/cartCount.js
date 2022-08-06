// This reducer is pretty useless, however it serves the purpose
// of dynamically updating the cart count in the header of the
// page (which is a completely isolated application component)

import { cartCount as types } from "../actions/types";
import { cart } from "../persistent";

const getCount = () => cart.get().length || 0;

export default (state = getCount(), { type }) => {
  if (!type.startsWith(types.BASE)) return state;

  switch (type) {
    case types.update: return getCount();
  }
  console.warn("unrecognized action with known base: " + type);
  return state;
};
