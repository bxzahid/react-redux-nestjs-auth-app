import { Link } from "@reach/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Error from "../components/Error";
import InputBox from "../components/InputBox";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { signin } from "../store/auth";

const SigninWithPasswordPage = () => {
	const dispatch = useDispatch();

	const { isLoading } = useSelector(({ meta }) => meta);
	const { errors } = useSelector(({ error }) => error);

	const [state, setState] = useState({
		phoneNo: "",
		password: "",
	});

	const { phoneNo, password } = state;

	const changeHandler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const keyDownHandler = (e) => {
		if (e.keyCode === 13) {
			dispatch(signin(state));
			setState({
				phoneNo: "",
				password: "",
			});
		}
	};

	const signinWithPasswordHandler = () => {
		dispatch(signin(state));
		setState({
			phoneNo: "",
			password: "",
		});
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
						onChange={changeHandler}
						placeholder="Phone number (Required)"
					/>
				</div>

				{errors?.phoneNo && <Error name={errors?.phoneNo} />}

				<div className="flex bg-green-50 mt-4 pl-5">
					<i className="fas fa-key fa-lg my-6"></i>
					<InputBox
						type="password"
						value={password}
						name="password"
						placeholder="Password"
						onChange={changeHandler}
						onKeyDown={keyDownHandler}
					/>
				</div>

				{errors?.password && <Error name={errors?.password} />}

				<Button
					title="Sign in with password"
					onClick={signinWithPasswordHandler}
					className="mt-4"
				/>

				<p className="mt-5 font-bold text-xl text-gray-700 text-center">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default SigninWithPasswordPage;
