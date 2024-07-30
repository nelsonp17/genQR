import { 
    IonContent, 
    IonPage,
    IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
	IonLabel,
} from "@ionic/react";
import { ArrowLeft, QrCode, Check, Clipboard, LinkSimple, TextT, User, At, ChatDots, MapPinLine, Phone, CalendarDots, WifiHigh } from "@phosphor-icons/react";

import { Link, RouteComponentProps } from "react-router-dom";

import ClipboardComponent from "./forms/ClipboardComponent";
import UrlComponent from "./forms/UrlComponent";
import TextComponent from "./forms/TextComponent";
import ContactComponent from "./forms/ContactComponent";
import EmailComponent from "./forms/EmailComponent";
import SmsComponent from "./forms/SmsComponent";
import CoordComponent from "./forms/CoordComponent";
import PhoneComponent from "./forms/PhoneComponent";
import CalendarComponent from "./forms/CalendarComponent";
import WifiComponent from "./forms/WifiComponent";

import { useState } from "react";
import { formatDataQR, generateUniqueImageName, tryGenerateQR, ParamsQRious } from '../../utils/Utils'
import StorageService from '../../utils/StorageService'
import { useIonRouter } from '@ionic/react';

interface GenerateQRPageProps extends RouteComponentProps<{ operation: string }> {}

const GenerateQR: React.FC<GenerateQRPageProps> = ({match}) => {

	// Use a more descriptive variable name
	const selectedOperation = match.params.operation;
	const router = useIonRouter();

	const [textData, setTextData] = useState("");
	const [codeQR, setCodeQR] = useState('');
	const [isValidQR, setIsValidQR] = useState(true);


	const handleTextChange = (newValue: string) => {
		const formattedData = formatDataQR(newValue, selectedOperation)
		//console.log(formattedData.getString)
		setTextData(formattedData.getString);

		//console.log("newValue: " + newValue)
		//console.log("formattedData: ", formattedData)
		//console.log("textData: ", textData)
	};
	const handleFormChange = (obj:any) => {
		const formattedData = formatDataQR(obj, selectedOperation)
		setTextData(formattedData.getString);
	}

	// Render the appropriate component based on operation
    const renderComponent  = () => {
		switch(selectedOperation){
			case 'clipboard':
				return <ClipboardComponent onTextChange={handleTextChange}/>;
			case 'url':
				return <UrlComponent onTextChange={handleTextChange}/>;
			case 'text':
				return <TextComponent onTextChange={handleTextChange}/>;
			case 'contact':
				return <ContactComponent onTextChange={handleFormChange}/>;
			case 'email':
				return <EmailComponent onTextChange={handleFormChange}/>;
			case 'sms':
				return <SmsComponent onTextChange={handleFormChange}/>;
			case 'coord':
				return <CoordComponent onTextChange={handleFormChange}/>;
			case 'phone':
				return <PhoneComponent onTextChange={handleFormChange}/>;
			case 'calendar':
				return <CalendarComponent onTextChange={handleFormChange}/>;
			case 'wifi':
				return <WifiComponent onTextChange={handleFormChange}/>;
			default:
				return 'No opearción'
		}
	}

	// generar QR
	const handleGenerateQR = async () => {
		const svgCode:ParamsQRious = {value: textData, level: 'H', size: 500}
		const codeReader = tryGenerateQR(svgCode)

		if(codeReader == false){
			setIsValidQR(false)
			return;
		}
		//const qrCodeImg = codeReader.toDataURL();
		//setCodeQR(qrCodeImg)
		console.log(textData, svgCode)

		const storage = new StorageService()
		const nameQr = generateUniqueImageName()+''
		await storage.create()
		await storage.remove(nameQr)
		await storage.set('qr_string', textData)
		await storage.set('name_qr_generate', nameQr)
		await storage.set(nameQr, textData)

		router.push('/v1/visorQR');
	}

	const renderTitle = () => {
		switch(selectedOperation){
			case 'clipboard':
				return (
					<div className="title-icon">
						<Clipboard size={24} className="mr-2"/>
						<IonLabel>Contenido del portapapeles</IonLabel>
					</div>
				);
			case 'url':
				return (
					<div className="title-icon">
						<LinkSimple size={24} className="mr-2"/>
						<IonLabel>URL</IonLabel>
					</div>
				);
			case 'text':
				return (
					<div className="title-icon">
						<TextT size={24} className="mr-2"/>
						<IonLabel>Texto</IonLabel>
					</div>
				);
			case 'contact':
				return (
					<div className="title-icon">
						<User size={24} className="mr-2"/>
						<IonLabel>Contacto</IonLabel>
					</div>
				);
			case 'email':
				return (
					<div className="title-icon">
						<At size={24} className="mr-2"/>
						<IonLabel>Dirección de correo electrónico</IonLabel>
					</div>
				);
			case 'sms':
				return (
					<div className="title-icon">
						<ChatDots size={24} className="mr-2"/>
						<IonLabel>Dirección SMS</IonLabel>
					</div>
				);
			case 'coord':
				return (
					<div className="title-icon">
						<MapPinLine size={24} className="mr-2"/>
						<IonLabel>Coordenadas geográficas</IonLabel>
					</div>
				);
			case 'phone':
				return (
					<div className="title-icon">
						<Phone size={24} className="mr-2"/>
						<IonLabel>Número de teléfono</IonLabel>
					</div>
				);
			case 'calendar':
				return (
					<div className="title-icon">
						<CalendarDots size={24} className="mr-2"/>
						<IonLabel>Calendario</IonLabel>
					</div>
				);
			case 'wifi':
				return (
					<div className="title-icon">
						<WifiHigh size={24} className="mr-2"/>
						<IonLabel>Wifi</IonLabel>
					</div>
				);
			default:
				return 'No opearción'
		}
	}

	return (
		<IonPage>
            <IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton>
							<Link to="/tabs/tab1" >
								<ArrowLeft size={32}/>
							</Link>
						</IonButton>
					</IonButtons>
					
					<IonTitle>Generar QR</IonTitle>

					<IonButtons slot="end">
						<IonButton onClick={handleGenerateQR}>
							<Check size={32} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen color='light'>
                <div className="py-5 px-4">
					<div className="mb-5">{renderTitle()}</div>
					{renderComponent ()}
					{ ''/* <p className="pt-8">{textData}</p> */ }
					<div className="mt-2">
						<IonButton color={'primary'} onClick={handleGenerateQR}>
							<QrCode size={28} className="mr-2"/>
							Generar QR
						</IonButton>
					</div>
					<div className="mt-3">
						{codeQR && <img src={codeQR} />}

					</div>

					{!isValidQR && <p style={{ color: 'red' }}>El texto no es válido para un código QR.</p>}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default GenerateQR;
