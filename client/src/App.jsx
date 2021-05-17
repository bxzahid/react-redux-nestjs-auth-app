import { Redirect, Router } from "@reach/router";
import { useSelector } from "react-redux";
import NotFound from "./pages/not-found";
import OtpVerify from "./pages/otp-verify";
import Profile from "./pages/profile";
import Signin from "./pages/signin";
import SigninWithPassword from "./pages/signin-with-password";
import Signup from "./pages/signup";

const App = () => {
	const { isAuthenticated } = useSelector(({ auth }) => auth);

	return (
		<Router>
			<Redirect from="/" to="/signin" noThrow />
			<Signup path="/signup" />
			<Signin path="/signin" />
			<OtpVerify path="/otp-verify" />
			<SigninWithPassword path="/signin-with-password" />
			<NotFound default />

			{(localStorage.getItem("isAuthenticated") === "true") |
			isAuthenticated ? (
				<Profile path="/profile" />
			) : (
				<Redirect from="*" to="/signin" noThrow />
			)}
		</Router>
	);
};

export default App;
