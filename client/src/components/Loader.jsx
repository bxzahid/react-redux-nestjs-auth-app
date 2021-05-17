const Loader = () => {
	return (
		<div className="flex h-screen">
			<div className="m-auto">
				<i className="fas fa-spinner-third fa-spin fa-lg"></i>
				<span className="font-medium text-2xl ml-2">Loading</span>
			</div>
		</div>
	);
};

export default Loader;
