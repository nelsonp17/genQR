import { forwardRef, ReactElement, useEffect, useState } from "react";
import { getActionQR, resizeTextarea, openAddressMaps} from "../utils/Utils";
import ListAction from "../components/ListAction";
import React from "react";
import { CalendarPlus, Chat, ChatDots, CopySimple, EnvelopeSimple, Link, MapPin, Password, Phone, ShareNetwork, UserPlus, WifiHigh } from "@phosphor-icons/react";
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';
import { IonToast } from "@ionic/react";
import { Browser } from '@capacitor/browser';
import { Contacts, PhoneType, EmailType, PostalAddressType } from '@capacitor-nelson/contacts';
import CalendarSevice from "../utils/CalendarService";

export const OptionQR = forwardRef((props, ref) => {
	const qr = props.qr;
	const [items, setItems] = useState([]);
	const [toast, setToast] = useState({
		duration: 5000,
		isOpen: false,
		message: ''
	});

	const handleUrl = async (url:string) => {
		if (url.startsWith("http://") || url.startsWith("https://")) {
			// Open URL in a browser
			await Browser.open({ url });
		}
	}
	const handleOpenMap = async (address:string) => {
		openAddressMaps(address)
	}
	const handleEmail = async (url:string) => {
		window.open(url, '_blank');
	}
	const handleContactSendEmail = async (email:string) => {
		const url = `mailto:${email}`
		window.open(url, '_blank');
	}
	const handleAddContact = async (contact:object) => {
		const res = await Contacts.createContact({
			contact: {
				name: {
					given: contact.nombre,
					family: contact.apellido,
				},
				organization: {
					company: contact.organizacion
				},
				phones: [
					{
						type: PhoneType.Mobile,
						label: "mobile",
						number: contact.tlf,
					},
				],
				emails: [
					{
						type: EmailType.Home,
						label: "home",
						address: contact.email,
						isPrimary: true,
					},
				],
				note: contact.notas,
				postalAddresses: [
					{
						type: PostalAddressType.Home,
						label: 'home',
						street: contact.direccion
					}
				]
			},
		});

		console.log(res.contactId);
		setToast((prev) => ({
			...prev,
			message: 'Contacto creado',
			isOpen: true,
		}))
	}
	const handleContactCall = async(tlf:string) => {
		const url = `tel:${tlf}`
		window.open(url, '_blank');
	}
	const handlePhoneCall = async(tlf:string) => {
		window.open(tlf, '_blank');
	}

	const sendSMS = async(template: string) => {
		try {
			window.open(template, '_blank');
		} catch (error) {
			console.error('Error al abrir el intent de SMS:', error);
		}
	}

	const handleShare = async(obj:object) => {
		await Share.share(obj);
	}
	const handleCopy = async(val:string) => {
		await Clipboard.write({
			string: val
		});
		setToast((prev) => ({
			...prev,
			message: 'Texto copiado al portapapeles',
			isOpen: true,
		}))
	}

	const openCalendarApp = async (eventData: object) => {
		try {
			// Crear un enlace de descarga con el contenido del VCalendar
			/**const blob = new Blob([vCalendarData], { type: 'text/calendar' });
			const url = URL.createObjectURL(blob);
	
			// Crear un enlace y simular un clic para iniciar la descarga
			const link = document.createElement('a');
			link.href = url;
			link.download = 'myevent.ics'; // Nombre sugerido para el archivo
			document.body.appendChild(link);
			link.click();
	
			// Limpiar el enlace y la URL
			document.body.removeChild(link);
			URL.revokeObjectURL(url);**/

			// prodid, summary, dtstart, dtend, direccion:location, description, text:icalString
			// title, location, url, notes, _startDate, _endDate, isAllDay
			const calendarSevice = await CalendarSevice(
				eventData.prodid,
				eventData.direccion,
				'',
				eventData.description,
				eventData.dtstart,
				eventData.dtend,
				false
			);
			if(!calendarSevice){
				setToast((prev) => ({
					...prev,
					message: 'Ah ocurrido algo inesperado no se ha creado el evento',
					isOpen: true,
				}))
			}else{
				setToast((prev) => ({
					...prev,
					message: 'Evento creado',
					isOpen: true,
				}))
			}
		} catch (error) {
			console.error('Error al abrir la aplicación de calendario:', error);
			console.log(error.message)
			if(error.message == 'checkPermission is not implemented on the web'){
				setToast((prev) => ({
					...prev,
					message: 'Esta opción no tiene implementación web',
					isOpen: true,
				}))
			}
		}
	};

	
	const handleActionClick = async(value:string, params: any) => {
		console.log('Llego hasta handleActionClick: ', params.type, value)
		switch(value){
			case 'share':
				const obj = {
					text: params.text
				}
				await handleShare(obj)
				break;
			case 'copy':
				await handleCopy(params.text)
				break;
			case 'url':
			case 'web':
				await handleUrl(params.params.url)
				break;
			case 'contact_map':
			case 'calendar_map':
				await handleOpenMap(params.params.direccion)
				break;
			case 'calendar':
				await openCalendarApp(params.params)
				break;
			case 'email':
				await handleEmail(params.params.url)
				break;
			case 'wifi_password':
				await handleCopy(params.params.password)
				break;
			case 'contact_add':
				await handleAddContact(params.params)
				break;
			case 'sms':
				await sendSMS(params.params.url)
				break;
			case 'sms_phone':
				const url = `sms:${params.params.tlf}?body=`
				await sendSMS(url)
				break;
			case 'contact_call':
				console.log('llamar')
				await handleContactCall(params.params.tlf)
				break;
			case 'phone_call':
				await handlePhoneCall(params.params.tlf)
				break;
			case 'contact_email':
				await handleContactSendEmail(params.params.email)
				break;
			
		}
	}

	const handleData = () => {
		setItems([]);
		const textareaT = document.querySelector("#text-qr-code") || null;
		if (textareaT) {
			const textarea: Element = textareaT;
			resizeTextarea(textarea);
		}
		const [ action, actionName, params ] = getActionQR(qr || "");
		console.log(params)
		const size = 48
		const icons = {
			share: <ShareNetwork size={size} />,
			copy: <CopySimple size={size} />,
			sms: <Chat size={size} />,
			sms_phone: <Chat size={size} />,
			web: <Link size={size} />, // abrir en el navegador
			wifi_password: <Password size={size} />, // copiar password wifi
			email: <EnvelopeSimple size={size} />,
			calendar: <CalendarPlus size={size} />,
			calendar_map: <MapPin size={size} />,
			contact_add: <UserPlus size={size} />,
			contact_map: <MapPin size={size} />,
			contact_call: <Phone size={size} />,
			contact_email: <EnvelopeSimple size={size} />,
			phone_call: <Phone size={size} />,

			//phone_add: <UserPlus size={size} />,
			//email_add_contact: <UserPlus size={size} />,
			//wifi: <WifiHigh size={size} />, // wifi
		};
		const max = action.length - 1;
		console.log(action);

		let list = [];
		action.forEach((value: string, index: number) => {
			let param = null
			for(const index in params){
				let _type = params[index].type
				if(_type.indexOf("|") > 0) {
					let types = _type.split("|")
					for(const typeIndex in types){
						if(types[typeIndex] == value){
							param = params[index]
						}
					}
				}else{
					if(params[index].type == value){
						param = params[index]
					}
				}
				
			}
			let newItem = {
				title: actionName[index],
				icon: icons[value],
				lines: "full",
				handleClick: ()=> {
					console.log(value)
					console.log(params)
					console.log(param)
					if(param){
						handleActionClick(value, param)
					}
				}
			};
			if (max == index) {
				newItem.lines = "none";
			}
			list.push(newItem);
		});

		return list;
	};

	const handleLoad = () => {
		if (qr != null || qr != undefined) {
			const list = handleData();
			setItems(list);
		}
	}
	useEffect(() => {
		handleLoad()
	}, []);

	
	return (
		<div>
			<div ref={ref} onClick={handleLoad}></div>
			<div className="qr-container">
				<div className="qr-code-container">
					{qr && <p>Texto Encontrado:</p>}
					<textarea
						id="text-qr-code"
						value={qr}
						readOnly
					></textarea>
					<div className="divider"></div>
					<ListAction listAction={items} />
				</div>
			</div>

			<IonToast 
				isOpen={toast.isOpen}
				message={toast.message}
				onDidDismiss={() => setToast((prev) => ({
					...prev,
					isOpen: false,
					}))
				}
				onClick={() => setToast((prev) => ({
					...prev,
					isOpen: false,
					}))
				}
				duration={toast.duration}
			></IonToast>
		</div>
	);
});

export default OptionQR;