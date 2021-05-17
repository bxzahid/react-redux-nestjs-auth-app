import { Link } from "@reach/router";

const NotFoundPage = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto">
				<h3 className="font-medium text-2xl ml-2">Page Not Found</h3>
				<span className="flex justify-center mt-3 text-xl">
					<Link to="/profile">Go Back</Link>
				</span>
			</div>
		</div>
	);
};

export default NotFoundPage;
