import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const CalendarComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		name: '',
		to: '',
		from: '',
		ubicacion: '',
		descripcion: '',
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		onTextChange(inputValue);
	};
	const elems: FormElement[] = [
		{
			type: 'input', typeInput: 'text', label: 'Nombre del Evento', placeholder: 'Nombre del evento', name: 'name', value: inputValue.name, className: 'input-theme', handleChange,
		},
		{
			type: 'input', typeInput: 'datetime-local', label: 'Inicia', placeholder: 'Inicia', name: 'to', value: inputValue.to, className: 'input-theme', handleChange,
		},
		{
			type: 'input', typeInput: 'datetime-local', label: 'Finaliza', labelClassName: 'padding', placeholder: 'Finaliza', name: 'from', value: inputValue.from, className: 'input-theme', handleChange,
		},
		{
			type: 'input', typeInput: 'text', placeholder: 'Ubicación', name: 'ubicacion', value: inputValue.ubicacion, className: 'input-theme', handleChange,
		},
		
		{
			type: 'textarea', placeholder: 'Descripción', name: 'descripcion', value: inputValue.descripcion, className: 'input-theme', handleChange,
		},
	]
	
	const listElems = elems.map(elem=>
		<div key={elem.name} className="container-input-theme">{renderFormElement(elem)}</div>
	);
	  
	return (
		<>
			{listElems}
		</>
	);
};

export default CalendarComponent;
