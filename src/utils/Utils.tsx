import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import QRious from "qrious";
import { IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
import { Device } from '@capacitor/device';
import { Share } from '@capacitor/share';

/* Algoritmo para formatear los datos para colocarlos en un QR */
export const formatDataQR = (_data: any, typeData: string) => {
	let formatted = { getString: "", data: null as any || Array };
	if (typeData == "clipboard" || typeData == "url" || typeData == "text") {
		formatted.getString = _data;
		formatted.data = _data;
	}
	else if(typeData == 'email'){
		const template = `mailto:${_data.email}?subject=${stringToUrl(_data.tema)}&body=${stringToUrl(_data.cuerpo)}`
		console.log(_data, template)
		formatted.getString = template
	}
	else if(typeData == 'contact'){
		const template = `BEGIN:VCARD\nVERSION:3.0\nN:${_data.nombre} ${_data.apellido}\nORG:${_data.organizacion}\nADR:${_data.direccion}\nTEL:${_data.tlf}\nEMAIL:${_data.email}\nNOTE:${_data.notas}\nEND:VCARD`
		//console.log(_data, template)
		formatted.getString = template
	}
	else if(typeData == 'sms'){
		const template = `sms:${_data.phone}?body=${_data.mensage}`
		formatted.getString = template
	}
	else if(typeData == 'phone'){
		const template = `tel:${_data.phone}`
		formatted.getString = template
	}
	else if(typeData == 'calendar'){
		const template = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:${_data.name}\nBEGIN:VEVENT\nSUMMARY:${_data.descripcion}\nDTSTART:${formatDateToCustomString(_data.to)}\nDTEND:${formatDateToCustomString(_data.from)}\nLOCATION:${_data.ubicacion}\nDESCRIPTION:${_data.descripcion}\nEND:VEVENT\nEND:VCALENDAR`
		//console.log(template)
		formatted.getString = template
	}
	else if(typeData == 'wifi'){
		const template = `WIFI:S:${_data.ssid};T:${_data.encryp};P:${_data.password};H:${_data.hidden};;`
		console.log(_data, template)
		formatted.getString = template
	}
	else {
		formatted.data = _data

		//formatted.data[_data.input] = _data.value;
		///formatted.getString = objectToString(formatted.data);

		console.log(_data)

	}

	return formatted;
};

/* funcion que convierte un objecto [clave:valor] en ts a un string */
export function objectToString<T>(obj: { [key: string]: T }): string {
	let resultString = "";

	for (const [key, value] of Object.entries(obj)) {
		// Add a separator before each key-value pair except for the first one
		if (resultString !== "") {
			resultString += ", ";
		}

		// Convert the value to a string representation
		let valueString: string;
		if (typeof value === "string") {
			valueString = `"${value}"`; // Enclose strings in double quotes
		} else {
			valueString = `${value}`; // Convert other types to strings
		}

		resultString += `${key}: ${valueString}`;
	}

	return resultString;
}

// Interface for form element data
export interface FormOptionElement {
	val: string | number | readonly string[] | undefined;
	option: string;
}
export interface FormElement {
	type: string; // Element type (input, select, textarea)
	typeInput?: string; // Element type (text, email, phone) (optional)
	placeholder?: string; // Placeholder text (optional)
	name: string; // Element name
	label?: string; // Label text (optional)
	labelClassName?: string; // Class name for label (optional)
	value: any; // Element value
	className: string; // Class name for element
	cols?: number; // Number of columns (for textarea)
	rows?: number; // Number of rows (for textarea)
	handleChange?: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void; // Change handler function (optional)
	options?: FormOptionElement[];
}

/* Formulario render */
// Function to render form elements (using JSX)
export const renderFormElement = (element: FormElement) => {
	switch (element.type) {
		case "input":
			return (
				<label htmlFor={element.name} className={element.labelClassName}>
					{element.label}
					<input
						type={element.typeInput || 'text'}
						className={element.className}
						name={element.name}
						placeholder={element.placeholder}
						id={element.name} // Ensure unique ID for accessibility
						value={element.value}
						onBlur={element.handleChange} onChange={element.handleChange}
					/>
				</label>
			)
		case "select":
			if(element.options == null || element.options == undefined){
				return;
			}
			return (
				<label htmlFor={element.name} className={element.labelClassName}>
					{element.label}
					<select className={element.className} name={element.name} value={element.value} id={element.name} 
					onBlur={element.handleChange} onChange={element.handleChange} >
						{
							element.options.map(item=>
								<option key={item.val} value={item.val}>{item.option}</option>
							) || ''
						}
					</select>
				</label>
			)
		case "select_ionic":
			if(element.options == null || element.options == undefined){
				return;
			}
			return (
				<label htmlFor={element.name} className={element.labelClassName}>
					{element.label}
					<IonSelect className={element.className} name={element.name} value={element.value} id={element.name} 
					onBlur={element.handleChange} onChange={element.handleChange} aria-label={element.placeholder} interface="action-sheet" placeholder={element.placeholder}>
						{
							element.options.map(item=>
								<IonSelectOption key={item.val} value={item.val}>{item.option}</IonSelectOption>
							) || ''
						}
					</IonSelect>
				</label>
			)
		case "textarea":
			return (
				<label htmlFor={element.name} className={element.labelClassName} >
					{element.label}
					<textarea
						className={element.className}
						name={element.name}
						placeholder={element.placeholder}
						id={element.name} // Ensure unique ID for accessibility
						value={element.value}
						onBlur={element.handleChange} onChange={element.handleChange}
						cols={element.cols || 9} // Optional default value for cols
						rows={element.rows || 12} // Optional default value for rows
					/>
				</label>
			)

		case "checkbox":
			return (
				<div className="mt-4 mb-3">
					<label htmlFor={element.name} className={element.labelClassName}>
						<input
							type="checkbox" // Cambiamos el tipo a "checkbox"
							className="mr-5"
							name={element.name}
							id={element.name} // Asegúrate de que el ID sea único para la accesibilidad
							checked={element.value} // Utilizamos "checked" en lugar de "value" para el checkbox
							onChange={element.handleChange}
							onBlur={element.handleChange}
						/>
						{element.label}
						
					</label>
				</div>

			)
		default:
			console.error(`Unsupported element type: ${element.type}`);
			return null; // Handle unsupported types gracefully
	}
};


// https://www.npmjs.com/package/qrious
export interface ParamsQRious{
	background?: string; // "white"
	backgroundAlpha?: number; // 1.0
	element?: Element; // <canvas>
	foreground?: string; // "black"
	foregroundAlpha?: number; // 1.0
	level?: string; // ('L' 'M' 'Q' 'H')	default 'L'
	mime?: string; // "image/png"
	padding?: number; // null (auto)
	size?: number; // 100
	value: string; // ""
}
export const tryGenerateQR = (code:ParamsQRious) => {
	try{
		return new QRious(code);
	}catch(e){
		console.log("Ah ocurrido un error, al generar el QR. Puede que el texto sea muy grande para comprimir")
		return false;
	}
}

/* Genera un nombre unico para las imagenes */
export function generateUniqueImageName() {
	const timestamp = Date.now(); // Obtenemos el timestamp actual (milisegundos desde el 1 de enero de 1970)
	const randomSuffix = Math.floor(Math.random() * 1000000); // Generamos un número aleatorio de 0 a 999999

	// Concatenamos el timestamp con el sufijo aleatorio para formar el nombre único
	const uniqueName = `${timestamp}${randomSuffix}`;

	return uniqueName;
}

// Ejemplo de uso:
//const imageName = generateUniqueImageName();
//console.log(`Nombre único para la imagen: ${imageName}`);
  
// guardar (pc)
export function downloadImageBase64(base64:string, nameFile:string) {
	const contentType = base64.match(/data:([^;]+);base64,/)?.[1];
	const bytes = atob(base64.replace(/data:([^;]+);base64,/g, ''));
	const buffer = new Uint8Array(bytes.length);
	for (let i = 0; i < bytes.length; i++) {
		buffer[i] = bytes.charCodeAt(i);
	}
	const blob = new Blob([buffer], { type: contentType });
	const urlDownload = URL.createObjectURL(blob);
	const linkDownload = document.createElement('a');
	linkDownload.href = urlDownload;
	linkDownload.download = nameFile;
	linkDownload.click();
	URL.revokeObjectURL(urlDownload);
}

// comprobar si esto en un dispositivo movil (android, ios) o pc
export const isMobileDevice = async () => {
	const { platform } = await Device.getInfo();
	return platform === 'android' || platform === 'ios';
};

// guardar (mobile)
export const writeFile = async (base64:string, nameFile:string) => {
	return await Filesystem.writeFile({
		path: `Generator QR Master/${nameFile}.png`,
		data: base64,
		directory: Directory.Documents,
	});

};

// compartir el QR
export const shareQrbase64 = async (base64:string, nameFile:string) => {
	await Filesystem.writeFile({
		path: `${nameFile}.png`,
		data: base64,
		directory: Directory.Documents,
	});

	// Obtener la URI del archivo guardado
	const uriResult = await Filesystem.getUri({
		directory: Directory.Documents,
		path: `${nameFile}.png`,
	});

	// Compartir el archivo
	await Share.share({
		url: uriResult.uri,
	})

	
}
// crea un canvas a partir de un base64
export const createCanvaToBase64 = (base64Image:string)=>{
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	// Crea una nueva imagen
	const image = new Image();
	//image.src = `data:image/png;base64,${base64Image}`;
	image.src = base64Image;

	// Espera a que la imagen se cargue antes de dibujarla en el canvas
	image.onload = () => {
		canvas.width = (image.width == 500) ? 1000 : image.width;
		canvas.height = (image.height == 500) ? 1000 : image.height;
		context.drawImage(image, 0, 0);
		// Aquí puedes realizar más operaciones en el canvas si lo deseas
	};

	return canvas;
}

//const textarea = document.getElementById('text-qr-code');
// Función para ajustar la altura del textarea
export function resizeTextarea(textarea:Element) {
    textarea.style.height = "5px";
    textarea.style.height = (textarea.scrollHeight) + "px";
}

export function openAddressMaps(ubicacion:string) {
	// Reemplaza 'TU_CLAVE_API' con tu clave de API de Google Maps
	//const apiKey = 'TU_CLAVE_API';
	//const url = `https://www.google.com/maps/search/${ubicacion}?api=${apiKey}`;
	const url = `https://www.google.com/maps/search/${ubicacion}`;
  
	// Abre la URL en una nueva pestaña
	window.open(url, '_blank');
}
export function openSendEmail(url:string) {
  
	// Abre la URL en una nueva pestaña
	window.open(url, '_blank');
}
  

// escapar string a url
export function stringToUrl(input: string): string {
	try {
		return encodeURIComponent(input);
	} catch (error) {
		console.error('Error al convertir la cadena en URL:', error);
		return input; // Devuelve una cadena vacía en caso de error
	}
}

// convertir datetime a este formato '20240724T155225'
export function formatDateToCustomString2(date:Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajustamos el mes para que tenga siempre 2 dígitos
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// Formateamos la cadena según el patrón 'YYYYMMDDTHHMMSS'
	const formattedString = `${year}${month}${day}T${hours}${minutes}${seconds}`;
	return formattedString;
}
export function formatDateToCustomString(dateTime: string): string {
	try {
		// Creamos un objeto Date a partir de la cadena de fecha y hora
		const dateObj = new Date(dateTime);

		// Obtenemos los componentes de la fecha y hora
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const hours = String(dateObj.getHours()).padStart(2, "0");
		const minutes = String(dateObj.getMinutes()).padStart(2, "0");
		const seconds = String(dateObj.getSeconds()).padStart(2, "0");

		// Formateamos la cadena según el patrón 'YYYYMMDDTHHMMSS'
		const formattedString = `${year}${month}${day}T${hours}${minutes}${seconds}`;
		return formattedString;
	} catch (error) {
		console.error("Error al convertir la fecha y hora:", error);
		return ""; // Devolvemos una cadena vacía en caso de error
	}
}

// Ejemplo de uso:
//const inputDateTime = "2024-08-09T16:11";
//const formattedResult = formatDateToCustomString(inputDateTime);
//console.log("Fecha y hora formateada:", formattedResult);



// creame una funcion en js llamada isActionSMS donde evalue un string similar a este "sms:04242102539?body=Hola mundo" donde hay dos variables el telefono y el mensaje sms:TELEFONO?body=MENSAJE, esta funcion debe enviar true si encontra este patron, recordar que las variables TELEFONO y MENSAJE cambian constantemente. Si no encuentra coincidencia debe devolver false
// creame una funcion en js llamada isActionEmail donde evalue un string similar a este "mailto:nelsonportillo982@gmail.com?subject=hola&body=hola+mundo+%F0%9F%8C%8D" donde hay variables como el email, subjecto y cuerpo, esta funcion debe enviar true si encontra este patron, recordar que las variables cambian constantemente. Si no encuentra coincidencia debe devolver false
// creame una funcion en js llamada isActionCalendar donde evalue un string similar a este `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:${_data.name}\nBEGIN:VEVENT\nSUMMARY:${_data.descripcion}\nDTSTART:${formatDateToCustomString(_data.to)}\nDTEND:${formatDateToCustomString(_data.from)}\nLOCATION:${_data.ubicacion}\nDESCRIPTION:${_data.descripcion}\nEND:VEVENT\nEND:VCALENDAR`
// donde hay variables, estas variables debe estraerlas e imprimir en consola, esta funcion debe enviar true si encontra este patron, recordar que las variables cambian constantemente. Si no encuentra coincidencia debe devolver false


// procesa la información obtenida de un QR y muestra las opciones a realizar
let paramsExt = []
export function isActionURL(urlString:string) {
	// Expresión regular para validar URLs
	const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gi;
	
	if (urlString.startsWith("http://") || urlString.startsWith("https://")) {
		if (urlRegex.test(urlString)) {
			console.log("La URL es válida:", urlString);
			paramsExt.push({
				type: 'web',
				text:urlString,
				params: {
					url: urlString, 
				}
			})
			return true;
		} else {
			console.log("La URL no es válida:", urlString);
			return false;
		}
	}

	
}
  
export function isActionWifi(wifiString:string) {
	// Expresión regular para extraer las variables
	const regex = /WIFI:S:(.+?);T:(.+?);P:(.+?);H:(.+?);;/;
  
	const match = wifiString.match(regex);
  
	if (match) {
		const [, ssid, encryp, password, hidden] = match;
		console.log('SSID:', ssid);
		console.log('Encriptación:', encryp);
		console.log('Contraseña:', password);
		console.log('Oculta:', hidden);
		paramsExt.push({
			type: 'wifi_password',
			text: `SSID: ${ssid}\nSeguridad: ${encryp}\nContraseña: ${password}\nRed oculta: ${(hidden=='false') ? 'No' : 'Si'}`,
			params: {
				ssid, encryp, password, hidden
			}
		})
		return true;
	} else {
		return false;
	}
}
  
export function isActionContact(vcardString:string) {
	// Expresión regular para extraer las variables
	const regex = /BEGIN:VCARD\nVERSION:3.0\nN:(.+?)\s(.+?)\nORG:(.+?)\nADR:(.+?)\nTEL:(.+?)\nEMAIL:(.+?)\nNOTE:(.+?)\nEND:VCARD/s;
  
	const match = vcardString.match(regex);
  
	if (match) {
		const [, nombre, apellido, organizacion, direccion, tlf, email, notas] = match;
		console.log('Nombre:', nombre);
		console.log('Apellido:', apellido);
		console.log('Organización:', organizacion);
		console.log('Dirección:', direccion);
		console.log('Teléfono:', tlf);
		console.log('Email:', email);
		console.log('Notas:', notas);

		paramsExt.push({
			type: 'contact_add|contact_map|contact_call|sms_phone|contact_email',
			text: `Nombre:${nombre + apellido}\nOrganización: ${organizacion}\nDirección: ${direccion}\nTeléfono: ${tlf}\nCorreo: ${email}\nNotas: ${notas}`,
			params: {
				nombre, apellido, organizacion, direccion, tlf, email, notas
			}
		})
		return true;
	} else {
		return false;
	}
}
  
export function isActionCalendar(icalString:string) {
	// Expresión regular para extraer las variables
	const regex = /BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:(.+?)\nBEGIN:VEVENT\nSUMMARY:(.+?)\nDTSTART:(.+?)\nDTEND:(.+?)\nLOCATION:(.+?)\nDESCRIPTION:(.+?)\nEND:VEVENT\nEND:VCALENDAR/s;
  
	const match = icalString.match(regex);
  
	if (match) {
		const [, prodid, summary, dtstart, dtend, location, description] = match;
		console.log('PRODID:', prodid);
		console.log('SUMMARY:', summary);
		console.log('DTSTART:', dtstart);
		console.log('DTEND:', dtend);
		console.log('LOCATION:', location);
		console.log('DESCRIPTION:', description);

		paramsExt.push({
			type: 'calendar|calendar_map',
			text: `Evento: ${prodid}\nFecha Inicio: ${dtstart}\nFecha Finalizacion: ${dtend}\nUbicación: ${location}\nDescripción: ${description}`,
			params: {
				prodid, summary, dtstart, dtend, direccion:location, description, text:icalString
			}
		})
		return true;
	} else {
	  return false;
	}
}
  
export function isActionEmail(str:string) {
	// Expresión regular para validar enlaces "mailto" con variables
	const regex = /^mailto:(.+?)(\?subject=(.+?))?(\&body=(.+?))?$/;
  
	// Intentar hacer coincidir la cadena con la expresión regular
	const match = str.match(regex);
  
	// Si hay una coincidencia, devolver true
	if (match) {
		const email = match[1];
		const subject = match[2];
		const body = match[3];
		console.log("Correo:", email);
		console.log("Subjecto:", subject);
		console.log("Body:", body);
		paramsExt.push({
			type: 'email',
			text: `Correo: ${email}\nSubjecto: ${subject}\nMensaje: ${body}`,
			params: {
				email, subject, body, url: str
			}
		})
		return true;
	} else {
		return false;
	}
}
export function isActionPhone(str:string){
	// Expresión regular para validar la cadena
	const regex = /^tel:(\d+)$/;

	// Aplicamos la expresión regular a la cadena
	const match = str.match(regex);
  
	// Si encontramos una coincidencia, extraemos el teléfono y el mensaje
	if (match) {
		const tlf = match[1];
		console.log("Teléfono:", tlf);
		paramsExt.push({
			type: 'sms_phone|contact_call',
			text: `Teléfono: ${tlf}`,
			params: {
				tlf
			}
		})
		return true;
	} else {
		return false;
	}
}  

// procesa la información obtenida de un QR y muestra las opciones a realizar
export function isActionSMS(str:string){
	// Expresión regular para validar la cadena
	const regex = /^sms:(\d+)\?body=(.+)$/;

	// Aplicamos la expresión regular a la cadena
	const match = str.match(regex);
  
	// Si encontramos una coincidencia, extraemos el teléfono y el mensaje
	if (match) {
		const tlf = match[1];
		const message = match[2];
		console.log("Teléfono:", tlf);
		console.log("Mensaje:", message);
		paramsExt.push({
			type: 'sms|contact_call',
			text: `Teléfono: ${tlf}\nMensaje: ${message}`,
			params: {
				tlf, message, url: str
			}
		})
		return true;
	} else {
		return false;
	}
}
export function getActionQR(qrString:string){
	let retorno = []
	let retornoName = []
	paramsExt = []
	if(isActionSMS(qrString)){
		retorno.push('sms', 'contact_call')
		retornoName.push('Enviar SMS', 'Llamar contacto')
	}
	if(isActionEmail(qrString)){
		retorno.push('email')
		retornoName.push('Enviar correo electrónico')
	}
	if(isActionCalendar(qrString)){
		retorno.push('calendar', 'calendar_map')
		retornoName.push('Añadir al calendario', 'Ver en mapa')
	}
	if(isActionContact(qrString)){
		retorno.push('contact_add', 'contact_map', 'contact_call', 'sms_phone', 'contact_email')
		retornoName.push('Añadir contacto', 'Ver en mapa', 'Llamar contacto', 'Enviar SMS', 'Enviar correo electrónico')
	}
	if(isActionPhone(qrString)){
		retorno.push('sms_phone', 'contact_call')
		retornoName.push('Enviar SMS', 'Llamar contacto')
	}
	if(isActionWifi(qrString)){
		retorno.push('wifi_password')
		retornoName.push('Copiar la contraseña')
	}
	if(isActionURL(qrString)){
		retorno.push('web')
		retornoName.push('Abrir enlace')
	}

	retorno.push('share', 'copy')
	retornoName.push('Compartir', 'Copiar')
	paramsExt.push({
		type: 'share',
		text: qrString,
		params: {
			text: qrString
		}
	})

	paramsExt.push({
		type: 'copy',
		text: qrString,
		params: {
			text: qrString
		}
	})

	return [retorno, retornoName, paramsExt];
}