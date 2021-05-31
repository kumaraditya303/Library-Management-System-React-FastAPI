import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export default store;
