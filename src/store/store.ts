import { AnyAction, CombinedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import {
  createStateSyncMiddleware,
  initMessageListener,
  // initStateWithPrevTab,
} from "redux-state-sync";

import { counterSlice } from "./reducers";
import { CounterState } from "./reducers/counterSlice";
import storage from "./storage";

const combinedReducer = combineReducers({
  counter: counterSlice,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: CombinedState<{ counter: CounterState }> | undefined,
  action: AnyAction
): any => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, createStateSyncMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});

// initStateWithPrevTab(store);
initMessageListener(store);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = (): any => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
