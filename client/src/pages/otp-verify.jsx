import { Link } from "@reach/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { verifyOTP } from "../store/auth";

const OtpVerifyPage = () => {
	const dispatch = useDispatch();

	const [otp, setOtp] = useState("");

	const { isLoading } = useSelector(({ meta }) => meta);
	const errors = useSelector(({ error }) => error);

	const changeHandler = (e) => {
		setOtp(e.target.value);
	};

	const keyDownHandler = (e) => {
		if (e.keyCode === 13) {
			dispatch(verifyOTP(otp));
			setOtp("");
		}
	};

	const otpVerifyHandler = () => {
		dispatch(verifyOTP(otp));
		setOtp("");
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col   w-10/12 sm:w-10/12 md:w-5/12 m-auto mt-16">
			<h1 className="text-gray-800  sm:text-3xl md:text-3xl mb-6">
				<i className="fas fa-mobile-alt"></i> OTP has been sent to your{" "}
				<span className="font-bold"> PHONE</span>
			</h1>

			<input
				type="text"
				value={otp}
				name="otp"
				placeholder="SMS OTP"
				onChange={changeHandler}
				onKeyDown={keyDownHandler}
				className="text-lg p-1 border-b-2  border-gray-800 text-center outline-none"
			/>

			{errors?.errors && <Error name={errors?.errors?.otp} />}
			{errors?.message && <Error name={errors?.message} />}

			<Button
				title="Submit"
				className="mt-5 border-2 border-black p-2"
				onClick={otpVerifyHandler}
			/>

			<p className="mt-5 font-bold text-xl text-gray-700 ml-2">
				<i className="fas fa-arrow-alt-circle-left"></i>
				<Link to="/signin"> Go to back to sign in</Link>
			</p>
		</div>
	);
};

export default OtpVerifyPage;
