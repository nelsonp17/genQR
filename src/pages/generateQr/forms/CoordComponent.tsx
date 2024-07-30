import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const CoordComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		latitud: '',
		longitud: '',
		consulta: '',
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		onTextChange(inputValue);
	};
	const elems: FormElement[] = [
		{
			type: 'input', typeInput: 'tel', placeholder: 'Latitud', name: 'latitud', value: inputValue.latitud, className: 'input-theme', handleChange,
		},
		{
			type: 'input', typeInput: 'tel', placeholder: 'Longitud', name: 'longitud', value: inputValue.longitud, className: 'input-theme', handleChange,
		},
		
		{
			type: 'input', placeholder: 'Consulta', name: 'consulta', value: inputValue.consulta, className: 'input-theme', handleChange,
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

export default CoordComponent;
