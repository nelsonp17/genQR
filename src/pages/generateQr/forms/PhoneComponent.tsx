import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const PhoneComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		phone: '',
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		onTextChange(inputValue);
	};
	const elems: FormElement[] = [
		{
			type: 'input', typeInput: 'tel', placeholder: 'Número de teléfono', name: 'phone', value: inputValue.phone, className: 'input-theme', handleChange,
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

export default PhoneComponent;
