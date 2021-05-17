import { navigate } from "@reach/router";
import axios from "axios";
import toastr from "toastr";
import { axiosInstance } from "../axios";
import setAuthToken from "../utils/setAuthToken";
import { catchError } from "./error";
import { setLoading } from "./meta";

toastr.options = {
	closeButton: true,
	newestOnTop: true,
	progressBar: true,
};

// Actions
const SET_USER = "SET_USER";

const init = {
	isAuthenticated: false,
	user: {},
};

// Reducer
const reducer = (state = init, { type, payload }) => {
	switch (type) {
		case SET_USER: {
			return {
				user: payload.user,
				isAuthenticated: Object.keys(payload.user).length !== 0,
			};
		}
		default:
			return state;
	}
};

export default reducer;

// Action Creators
export const signup = (user) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axiosInstance.post("/auth/user-signup", user);
		toastr.success(data);
		dispatch(setLoading(false));
		dispatch(catchError());
		navigate("/signin");
	} catch (e) {
		e?.response?.data?.message &&
			toastr.error(e?.response?.data?.message?.split(":")[2]);
		dispatch(setLoading(false));
		dispatch(catchError(e?.response?.data));
	}
};

export const signin = (user) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const { data } = await axiosInstance.post("/auth/user-login", user);
		localStorage.setItem("token", data?.token);
		const { data: getMeResponse } = await axiosInstance.get(
			"/auth/get-me",
			{
				headers: {
					Authorization: `Bearer ${data?.token}`,
				},
			}
		);
		dispatch(setUser(getMeResponse));
		if (getMeResponse.phoneNo) {
			localStorage.setItem("isAuthenticated", true);
		}
		toastr.success(data?.message);
		dispatch(setLoading(false));
		dispatch(catchError());
		navigate("/profile");
	} catch (e) {
		e?.response?.data?.message && toastr.error(e?.response?.data?.message);
		dispatch(setLoading(false));
		dispatch(catchError(e?.response?.data));
	}
};

export const sendOTP = (phoneNo) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const {
			data: { otpToken },
		} = await axiosInstance.post("/auth/send-otp", {
			phoneNo,
		});
		localStorage.setItem("phoneNo", phoneNo);
		localStorage.setItem("otpToken", otpToken);
		dispatch(setLoading(false));
		dispatch(catchError());
		navigate("/otp-verify");
	} catch (e) {
		dispatch(setLoading(false));
		dispatch(catchError(e?.response?.data));
	}
};

export const verifyOTP = (otp) => async (dispatch) => {
	try {
		const phoneNo = localStorage.getItem("phoneNo");
		const otpToken = localStorage.getItem("otpToken");
		dispatch(setLoading(true));
		const { data } = await axiosInstance.post("/auth/verify-otp", {
			phoneNo,
			otp,
			otpToken,
		});
		localStorage.removeItem("phoneNo");
		localStorage.removeItem("otpToken");
		localStorage.setItem("token", data?.token);
		const { data: getMeResponse } = await axiosInstance.get(
			"/auth/get-me",
			{
				headers: {
					Authorization: `Bearer ${data?.token}`,
				},
			}
		);
		dispatch(setUser(getMeResponse));
		if (getMeResponse.phoneNo) {
			localStorage.setItem("isAuthenticated", true);
		}
		dispatch(setLoading(false));
		dispatch(catchError());
		navigate("/profile");
	} catch (e) {
		dispatch(setLoading(false));
		dispatch(catchError(e?.response?.data));
	}
};

export const logout = () => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		setAuthToken(localStorage.getItem("token"));
		const { data } = await axios.post(
			`${process.env.REACT_APP_API_URL}/auth/user-logout`
		);
		localStorage.removeItem("token");
		dispatch(setLoading(false));
		dispatch(setUser());
		localStorage.removeItem("isAuthenticated");
		toastr.success(data);
		navigate("/signin");
	} catch (e) {
		dispatch(setLoading(false));
		if (e?.response?.data?.message) {
			localStorage.clear();
			toastr.success("You have logged out successfully");
			return navigate("/signin");
		}
		e?.response?.data && toastr.error(e?.response?.data);
	}
};

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: { user: user ? user : {} },
	};
};
