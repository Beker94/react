import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import { rootSaga } from "./rootSaga";
import { side } from "../helpers";
import { filmListReducer } from "./filmList/reducers/filmList.reducer";
import { modalReducer } from "./modal/reducers/modal.reducer";
import { filmFilmDetailsReducer } from "./filmDetails/reducers/filmDetails.reducer";
import { formReducer } from "./form/reducers/form.reducer";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

let shouldHydrate = true;

export function rootReducer(state: any, action: AnyAction) {
  switch (action.type) {
    case HYDRATE:
      if (shouldHydrate) {
        if (side.isClient) {
          if (!shouldHydrate) {
            return { ...state };
          }
          shouldHydrate = false;
        }

        return { ...state, ...action.payload };
      }
    default: {
      return combineReducers({
        films: filmListReducer,
        modal: modalReducer,
        filmDescription: filmFilmDetailsReducer,
        form: formReducer,
      })(state, action);
    }
  }
}

export const makeStore = () => {
  if (side.isServer) {
    shouldHydrate = true;
  }
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
