import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const EmailComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		email: '',
		tema: '',
		cuerpo: '',
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		onTextChange(inputValue);
	};
	const elems: FormElement[] = [
		{
			type: 'input', typeInput: 'email', placeholder: 'Dirección de correo electrónico', name: 'email', value: inputValue.email, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Tema', name: 'tema', value: inputValue.tema, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Cuerpo', name: 'cuerpo', value: inputValue.cuerpo, className: 'input-theme', handleChange,
		},
	]
	
	const listElems = elems.map(elem=>
		<div key={elem.name}>{renderFormElement(elem)}</div>
	);
	  
	return (
		<>
			{listElems}
		</>
	);
};

export default EmailComponent;
