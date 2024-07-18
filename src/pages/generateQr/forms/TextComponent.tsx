import { useState } from "react";

const TextComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event:any) => {
		setInputValue(event.target.value);

		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(event.target.value);
	};

	return (
		<>
			<textarea 
				type="text" 
				value={inputValue}
				onChange={handleChange}
				placeholder="Texto"
				className="input-theme"
				cols={9}
				rows={12}
			></textarea>
		</>
	);
};

export default TextComponent;
