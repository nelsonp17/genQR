import { useState } from "react";
import {renderFormElement, FormElement, FormOptionElement} from "../../../utils/Utils";

const WifiComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState({
		ssid: '',
		password: '',
		encryp: '',
		hidden: false,
	});
	const handleChange = (event:any) => {

		const { name, value } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state

		onTextChange(inputValue);
	};
	const handleChangeCheckbox = (event:any) => {

		const { name, checked } = event.target; // Destructure name and value from event object
    	setInputValue((prevState) => ({ ...prevState, [name]: checked })); // Update specific property in state

		onTextChange(inputValue);
	};

	const options: FormOptionElement[] = [
		{option:'WPA/WPA2', val: 'WPA'},
		{option:'WPE', val: 'WPE'},
		{option:'Sin contraseña', val: 'nopass'},
	]
	const elems: FormElement[] = [
		{
			type: 'input', placeholder: 'SSID/nombre de red', name: 'ssid', value: inputValue.ssid, className: 'input-theme', handleChange,
		},
		{
			type: 'input', placeholder: 'Contraseña',  name: 'password', value: inputValue.password, className: 'input-theme', handleChange,
		},
		{
			type: 'select_ionic', placeholder: 'Seleccióne una opción', className: 'select-ionic-theme', name: 'encryp', value: inputValue.encryp, handleChange,
			options,
		},
		{
			type: 'checkbox', label: 'Oculto',  name: 'hidden', value: inputValue.hidden, className: 'input-theme', handleChange: handleChangeCheckbox,
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

export default WifiComponent;
