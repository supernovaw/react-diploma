import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import epics from "./epics";

import topSalesRequest from "./reducers/topSalesRequest";

const reducers = combineReducers({
  topSalesRequest
});

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(combineEpics(...epics));

export default store;
