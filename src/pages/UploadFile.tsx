import {
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonContent,
	IonPage,
	IonButton,
} from "@ionic/react";
import { useRef, useState, useCallback, createRef, useEffect } from "react";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeDetector } from "barcode-detector/pure";
import { handleQRCodeContent } from "../utils/Utils";
import { QrCode, UploadSimple } from "@phosphor-icons/react";
import OptionQR from "./OptionQR";
import StorageService from "../utils/StorageService";

const UploadFile: React.FC = () => {
	const [imageElement, setImageElement] = useState('');
	const [qrText, setQrText] = useState('');
	const optionRef = useRef(null);

	const i = () => {
        setTimeout(async() => {
			const storage = new StorageService()
			await storage.create()
			const reset_view = await storage.get('reset_view')
			if(reset_view == 'true'){
				await storage.set('reset_view', 'false')
				console.log("reseteado")
				setQrText('')
			}
		}, 500)
		return <i></i>
    }

	const getOptionClick = ()=>{
		optionRef.current.click()
		//console.log(optionRef)
		//optionRef.current.click()
		//console.log(optionRef.current.click())
		//optionRef.current.getData()
	}

	async function handleCamera() {
		await pickImages()
	}
	async function pickImages() {
		const image = await Camera.getPhoto({
			quality: 100, // Set image quality (0-100)
			source: CameraSource.Photos,
			resultType: CameraResultType.Uri,
			//resultType: CameraResultType.Base64,
			allowEditing: false,
		});
	
		const imageUrl = image.webPath;
		const imgTag = document.querySelector('#qr')
		
		//const imageFormat = (image.format == 'png') ? 'image/png' : 'image/jpeg'
		//const imageUrl = `data:${imageFormat};base64,${image.base64String}`;
		if(imageUrl==undefined){ return }
		
		setImageElement(imageUrl)
		const barcodeDetector = new BarcodeDetector();
		setTimeout(()=>{
			barcodeDetector.detect(imgTag).then((_qr:any)=>{
				try{
					const value = _qr[0].rawValue;
					console.log(value)
					setQrText(value)

					//setTimeout( async() => await handleQRCodeContent(qrText), 1000);
					
					setTimeout(()=>{
						document.querySelector("#button-click")?.click()
					}, 500)
				}catch(e){
					console.log(e)
				}
			});
		}, 500)

		

	}
	
	return (
		<IonPage>
			<IonContent fullscreen>
				{i()}
				<div className="qr-container">
					<img id="qr" src={imageElement} alt="camera img" />
				</div>

				{	!qrText &&
					<main className="max-w-6xl mx-auto pt-10 pb-36 px-2">
						<div className="w-center mx-auto text-center">
							<h1 className="text-2xl font-semibold mb-1">
								<span className="text-primary">Escanea</span> un
								Archivo
							</h1>
							<p className="text-2xs text-gray-500 mb-3">
								Escanea un archivo desde la Galería
							</p>

							<div className="img-container-qr">
								<img src="img/escaneame-codigo-qr.png" />
							</div>
							<IonButton expand="block" onClick={handleCamera}>
								<UploadSimple size={24} className="mr-2" />
								Subir
							</IonButton>
						</div>
					</main>
				}

				{	qrText &&
					<main className="max-w-6xl mx-auto pt-10 pb-36 px-2">
						<div className="w-center mx-auto text-center">
							<h1 className="text-2xl font-semibold mb-1">
								<span className="text-primary">Escanea</span> un
								Archivo
							</h1>
							<p className="text-2xs text-gray-500 mb-3">
								Escanea un archivo desde la Galería
							</p>

							<div className="txt-qr">
								<OptionQR qr={qrText} ref={optionRef}  key={'uploadFile'}/>
							</div>
							<IonButton expand="block" onClick={handleCamera}>
								<UploadSimple size={24} className="mr-2" />
								Subir
							</IonButton>
							<div id="button-click" onClick={getOptionClick}></div>
						</div>
					</main>
				}
			</IonContent>
		</IonPage>
	);
};

export default UploadFile;
