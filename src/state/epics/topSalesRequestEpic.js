import creators from "../actions/topSalesRequestCreators";
import { topSalesRequest as types } from "../actions/types";
import { ofType } from "redux-observable";
import { catchError, map, of, retry, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

const url = process.env.REACT_APP_BACKEND_URL + "/top-sales";

export default action$ => action$.pipe(
  ofType(types.initiate),
  switchMap(
    () => ajax.getJSON(url).pipe(
      retry(1),
      map(response => creators.success(response)),
      catchError(error => of(creators.failure(error)))
    )
  )
);
