import { rootSaga, saga } from './rootSaga';

import { createStore, applyMiddleware } from "redux";

import { rootReducer } from "./rootReducer";

export let store = createStore(rootReducer, applyMiddleware(saga));

if (process.env.NODE_ENV === "development") {
  const { composeWithDevTools } = require("redux-devtools-extension");
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saga)));
}

saga.run(rootSaga);
