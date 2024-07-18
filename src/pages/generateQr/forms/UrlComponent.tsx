import { useState } from "react";

const UrlComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState('http://');
	const handleChange = (event:any) => {
		setInputValue(event.target.value);

		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(event.target.value);
	};

	return (
		<>
			<input 
				type="url" 
				value={inputValue}
				onChange={handleChange}
				placeholder="URL"
				className="input-theme" 
			/>
		</>
	);
};

export default UrlComponent;
