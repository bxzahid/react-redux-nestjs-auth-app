import { Link } from "@reach/router";

const Button = ({ title, className, path, onClick }) => {
	return (
		<>
			{path ? (
				<p
					className={`mt-5 font-bold text-xl text-gray-700 text-center ${className}`}>
					<Link to={path}>{title}</Link>
				</p>
			) : (
				<button
					className={`bg-gray-700 p-4 text-xl border-4 border-yellow-500 ${className}`}
					onClick={onClick}>
					<span className="text-white">{title}</span>
				</button>
			)}
		</>
	);
};

export default Button;
