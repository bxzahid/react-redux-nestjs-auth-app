import { Link } from "@reach/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Error from "../components/Error";
import InputBox from "../components/InputBox";
import Loader from "../components/Loader";
import Title from "../components/Title";
import { signup } from "../store/auth";

const SignupPage = () => {
	const dispatch = useDispatch();

	const { isLoading } = useSelector(({ meta }) => meta);
	const { errors } = useSelector(({ error }) => error);

	const [state, setState] = useState({
		phoneNo: "",
		name: "",
		email: "",
		password: "",
	});

	const { phoneNo, name, email, password } = state;

	const changeHandler = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const keyDownHandler = (e) => {
		if (e.keyCode === 13) {
			dispatch(signup(state));
			setState({
				phoneNo: "",
				name: "",
				email: "",
				password: "",
			});
		}
	};

	const signUpHandler = () => {
		dispatch(signup(state));
		setState({
			phoneNo: "",
			name: "",
			email: "",
			password: "",
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col  w-10/12 sm:w-10/12 md:w-5/12 m-auto mt-16">
			<div className="flex flex-col">
				<Title name="Create a new account" />

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
					<i className="far fa-user fa-lg my-6"></i>
					<InputBox
						value={name}
						name="name"
						onChange={changeHandler}
						placeholder="Name (Required)"
					/>
				</div>

				{errors?.name && <Error name={errors?.name} />}

				<div className="flex bg-green-50 pl-5 mt-4">
					<i className="far fa-envelope fa-lg my-6"></i>
					<InputBox
						type="email"
						value={email}
						name="email"
						onChange={changeHandler}
						placeholder="Email"
					/>
				</div>

				{errors?.email && <Error name={errors?.email} />}

				<div className="flex bg-green-50 mt-4 pl-5">
					<i className="fas fa-key fa-lg my-6"></i>
					<InputBox
						type="password"
						value={password}
						name="password"
						onChange={changeHandler}
						onKeyDown={keyDownHandler}
						placeholder="Password"
					/>
				</div>

				{errors?.password && <Error name={errors?.password} />}

				<Button
					title="Sign Up"
					onClick={signUpHandler}
					className="mt-4"
				/>

				<p className="mt-5 font-bold text-xl text-gray-700 ml-2">
					<i className="fas fa-arrow-alt-circle-left"></i>
					<Link to="/signin"> Go to back to sign in</Link>
				</p>
			</div>
		</div>
	);
};

export default SignupPage;
