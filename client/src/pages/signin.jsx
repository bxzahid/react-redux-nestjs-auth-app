import { Link } from "@reach/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Error from "../components/Error";
import InputBox from "../components/InputBox";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { sendOTP } from "../store/auth";

const SigninPage = () => {
	const dispatch = useDispatch();

	const { isLoading } = useSelector(({ meta }) => meta);
	const errors = useSelector(({ error }) => error);

	const [phoneNo, setPhoneNo] = useState("");

	const changeHandler = (e) => {
		setPhoneNo(e.target.value);
	};

	const keyDownHandler = (e) => {
		if (e.keyCode === 13) {
			dispatch(sendOTP(phoneNo));
			setPhoneNo("");
		}
	};

	const signInHandler = () => {
		dispatch(sendOTP(phoneNo));
		setPhoneNo("");
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col  w-10/12 sm:w-10/12 md:w-5/12 m-auto mt-16">
			<div className="flex flex-col">
				<Title name="Log In" />

				<div className="flex bg-green-50 pl-5">
					<i className="fas fa-mobile-alt fa-lg my-6"></i>
					<InputBox
						type="tel"
						value={phoneNo}
						name="phoneNo"
						placeholder="Enter your phone number"
						onChange={changeHandler}
						onKeyDown={keyDownHandler}
					/>
				</div>

				{errors?.errors?.phoneNo && (
					<Error name={errors?.errors?.phoneNo} />
				)}
				{errors?.message && <Error name={errors?.message} />}

				<Button
					title="Sign in"
					className="mt-5"
					onClick={signInHandler}
				/>

				<Button
					title="Sign in with password"
					className="mt-5 border-2 border-black p-2"
					path="/signin-with-password"
				/>

				<p className="mt-5 font-bold text-xl text-gray-700 text-center">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default SigninPage;
