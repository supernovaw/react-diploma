import { useDispatch, useSelector } from "react-redux";
import topSalesRequestCreators from "./actions/topSalesRequestCreators";

export default function useStateAccess() {
  const dispatch = useDispatch();
  const entireState = useSelector(s => s);
  return {
    topSalesRequest: {
      state: entireState.topSalesRequest,
      initiate: () => dispatch(topSalesRequestCreators.initiate())
    }
  };
}
