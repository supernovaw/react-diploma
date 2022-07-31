import creators from "../actions/itemDetailsRequestCreators";
import { itemDetailsRequest as types } from "../actions/types";
import { ofType } from "redux-observable";
import { catchError, map, of, retry, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

const url = process.env.REACT_APP_BACKEND_URL + "/items/";

export default action$ => action$.pipe(
  ofType(types.initiate),
  map(action => action.payload),
  switchMap(
    ({ id }) => ajax.getJSON(url + +id).pipe(
      retry(1),
      map(response => creators.success(id, response)),
      catchError(error => of(creators.failure(id, error)))
    )
  )
);
