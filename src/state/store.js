import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import epics from "./epics";

import topSalesRequest from "./reducers/topSalesRequest";
import categoriesRequest from "./reducers/categoriesRequest";
import itemsRequest from "./reducers/itemsRequest";
import itemDetailsRequest from "./reducers/itemDetailsRequest";

const reducers = combineReducers({
  topSalesRequest,
  categoriesRequest,
  itemsRequest,
  itemDetailsRequest,
});

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(combineEpics(...epics));

export default store;
