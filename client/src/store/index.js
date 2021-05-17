import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import auth from "./auth";
import error from "./error";
import meta from "./meta";

const middleware =
	process.env.NODE_ENV === "development"
		? composeWithDevTools(applyMiddleware(...[thunk]))
		: applyMiddleware(...[thunk]);

const store = createStore(
	combineReducers({
		auth,
		error,
		meta,
	}),
	middleware
);

export default store;
