import { useState } from "react";

const ClipboardComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event:any) => {
		setInputValue(event.target.value);

		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(event.target.value);
	};
	  
	return (
		<>
			<textarea 
			value={inputValue}
			onChange={handleChange}
			placeholder="Texto encontrado"
			className="input-theme" cols={9} rows={12}></textarea>
		</>
	);
};

export default ClipboardComponent;
