import { useDispatch, useSelector } from "react-redux";
import topSalesRequestCreators from "./actions/topSalesRequestCreators";
import categoriesRequestCreators from "./actions/categoriesRequestCreators";
import itemsRequestCreators from "./actions/itemsRequestCreators";

export default function useStateAccess() {
  const dispatch = useDispatch();
  const entireState = useSelector(s => s);
  return {
    topSalesRequest: {
      state: entireState.topSalesRequest,
      initiate: () => dispatch(topSalesRequestCreators.initiate())
    },
    categoriesRequest: {
      state: entireState.categoriesRequest,
      initiate: () => dispatch(categoriesRequestCreators.initiate())
    },
    itemsRequest: {
      state: entireState.itemsRequest,
      proceed: (categoryId, offset, search) => dispatch(itemsRequestCreators.proceed(categoryId, offset, search))
    },
  };
}
