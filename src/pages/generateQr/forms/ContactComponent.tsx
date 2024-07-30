import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const ContactComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		nombre: '',
		apellido: '',
		organizacion: '',
		direccion: '',
		tlf: '',
		email: '',
		notas: '',
		//select: '',
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		// Invocar la función prop onTextChange para notificar al padre
		//console.log(event.target.name)
		onTextChange(inputValue);
	};
	const selectOption: FormOptionElement[] = [
		{val:'', option: 'Seleccione una opción'},
		{val:'man', option: 'Hombre'},
		{val:'woman', option: 'Mujer'},
	]
	const elems: FormElement[] = [
		/*{ 
			type: 'select', options: selectOption, placeholder: 'Seleccione una opción', name: 'select', value: inputValue.select, 
			className: 'input-theme', handleChange 
		},*/
		{
			type: 'input', placeholder: 'Nombre', name: 'nombre', value: inputValue.nombre, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Apellido', name: 'apellido', value: inputValue.apellido, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Organización', name: 'organizacion', value: inputValue.organizacion, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Dirección', name: 'direccion', value: inputValue.direccion, className: 'input-theme', handleChange,
		},
		{
			type: 'input', typeInput: 'phone', placeholder: 'Número de teléfono', name: 'tlf', value: inputValue.tlf, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Correo Electrónico', name: 'email', value: inputValue.email, className: 'input-theme', handleChange,
		},
		{
			type: 'textarea', placeholder: 'Notas', name: 'notas', value: inputValue.notas, className: 'input-theme', handleChange,
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

export default ContactComponent;
