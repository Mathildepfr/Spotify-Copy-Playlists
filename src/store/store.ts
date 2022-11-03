import createSagaMiddleware from "redux-saga";

import { configureStore } from "@reduxjs/toolkit";
// configureStore: A friendly abstraction over the standard Redux createStore function that
// adds good defaults to the store setup for a better development experience.
// https://redux-toolkit.js.org/api/configureStore

import reducers from "./reducers";
import rootSaga from "./sagas";

// create the saga middleware
// createSagaMiddleware(options)​: Creates a Redux middleware and connects the Sagas to the Redux Store
// https://redux-saga.js.org/docs/api/

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga); // IMPORTANT !

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
