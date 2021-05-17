const InputBox = ({
	type = "text",
	value,
	name,
	placeholder,
	onChange,
	onKeyDown,
}) => {
	return (
		<input
			type={type}
			value={value}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			onKeyDown={onKeyDown}
			className="bg-green-50 placeholder-gray-800 text-lg p-5 w-full outline-none"
		/>
	);
};

export default InputBox;
