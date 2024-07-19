import { useState } from "react";
import {renderFormHtml} from "../../../utils/Utils";

const ContactComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		nombre: '',
		apellido: '',
		organizacion: '',
		direccion: '',
		tlf: '',
		email: '',
		notas: '',
	});
	const handleChange = (event:any) => {
		setInputValue(event.target.value);

		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(event.target.value);
	};
	const elems = [
		{ type: 'input', placeholder: 'Nombre', name: 'nombre', value: inputValue.nombre, className: 'input-theme' },
		{ type: 'input', placeholder: 'Apellido', name: 'apellido', value: inputValue.apellido, className: 'input-theme' },
		{ type: 'input', placeholder: 'Organización', name: 'organizacion', value: inputValue.organizacion, className: 'input-theme' },
		{ type: 'input', placeholder: 'Dirección', name: 'direccion', value: inputValue.direccion, className: 'input-theme' },
		{ type: 'input', placeholder: 'Número de teléfono', name: 'tlf', value: inputValue.tlf, className: 'input-theme' },
		{ type: 'input', placeholder: 'Correo Electrónico', name: 'email', value: inputValue.email, className: 'input-theme' },
		{ type: 'textarea', placeholder: 'Notas', name: 'notas', value: inputValue.notas, className: 'input-theme' },
	]
	
	const listElems = elems.map((elem)=>renderFormHtml(elem) )
	  
	return (
		<>
			{listElems}
		</>
	);
};

export default ContactComponent;
