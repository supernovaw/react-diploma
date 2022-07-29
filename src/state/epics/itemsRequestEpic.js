import creators from "../actions/itemsRequestCreators";
import { itemsRequest as types } from "../actions/types";
import { ofType } from "redux-observable";
import { catchError, map, of, retry, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

const excludeEmptyFields = obj => {
  let result = {}; Object.keys(obj).filter(key => obj[key]).forEach(key => result[key] = obj[key]); return result;
};
const params = p => {
  const filtered = excludeEmptyFields(p);
  const isEmpty = !Object.keys(filtered).length;
  return (isEmpty ? "" : "?") + new URLSearchParams(filtered);
};
const url = process.env.REACT_APP_BACKEND_URL + "/items";

export default action$ => action$.pipe(
  ofType(types.proceed),
  map(action => action.payload),
  switchMap(
    ({ categoryId, offset }) => ajax.getJSON(url + params({ categoryId, offset })).pipe(
      retry(1),
      map(response => creators.success(categoryId, response)),
      catchError(error => of(creators.failure(categoryId, error)))
    )
  )
);
