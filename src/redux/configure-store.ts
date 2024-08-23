import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { loginReducer } from "./thunk/redusers/post-user";
import { feedbacksReducer } from "./thunk/redusers/feedbacks";
import { trainingReducer } from "./thunk/redusers/training";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });


const rootReducer =  combineReducers({
  router: routerReducer,
  login: loginReducer.reducer,
  feedbacks:feedbacksReducer.reducer,
  training:trainingReducer.reducer
  })


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(routerMiddleware),
});



export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


