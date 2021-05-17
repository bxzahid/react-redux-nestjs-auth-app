import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { logout } from "../store/auth";

const ProfilePage = () => {
	const dispatch = useDispatch();

	const { user } = useSelector(({ auth }) => auth);
	const { isLoading } = useSelector(({ meta }) => meta);

	const logoutHandler = () => {
		dispatch(logout());
	};

	if (isLoading) {
		return <Loader />;
	}
	return (
		<>
			<div className="mt-16 py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
				<img
					className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
					src="/img/profile-photo.png"
					alt="Profile Pic"
				/>
				<div className="text-center space-y-2 sm:text-left">
					<div className="space-y-0.5">
						<p className="text-lg text-black font-semibold">
							{user?.name}
						</p>
						<p className="text-gray-500 font-medium">
							{user?.email}
						</p>
					</div>
					<button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
						{user?.phoneNo}
					</button>
				</div>
			</div>
			<div className="flex justify-center mt-8 ">
				<button
					className=" bg-red-600 active:bg-red-700 py-1 px-5 text-xl text-white rounded-md focus:outline-none"
					onClick={logoutHandler}>
					Logout
				</button>
			</div>
		</>
	);
};

export default ProfilePage;
