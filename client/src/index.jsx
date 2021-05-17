import { navigate } from "@reach/router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "toastr/build/toastr.min.css";
import App from "./App";
import { axiosInstance } from "./axios";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { setUser } from "./store/auth";
import setAuthToken from "./utils/setAuthToken";

const token = localStorage.getItem("token");

const getMe = async () => {
	try {
		const { data } = await axiosInstance.get("/auth/get-me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		store.dispatch(setUser(data));
	} catch (e) {
		if (e?.response?.data?.message) {
			localStorage.clear();
			navigate("/signin");
		}
	}
};

if (token) {
	setAuthToken(token);
	getMe();
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
