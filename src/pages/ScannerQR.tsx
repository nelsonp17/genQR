import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerScanResult, CapacitorBarcodeScannerAndroidScanningLibrary} from "@capacitor/barcode-scanner";
import { useState, useRef, useEffect } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import OptionQR from "./OptionQR";
import StorageService from "../utils/StorageService";
const ScannerQR: React.FC = () => {
	const [qrText, setQrText] = useState(""); // State to store scanned data
	const optionScannerRef = useRef(null);

	const startScan =  async() => {
		try{
			setQrText('')
			const options:CapacitorBarcodeScannerOptions = {
				hint: 17,
				//scanButton: true,
				scanText: 'Escanear QR',
				android: {
					scanningLibrary: CapacitorBarcodeScannerAndroidScanningLibrary.MLKIT
				},
			}
			const result = await CapacitorBarcodeScanner.scanBarcode(options)
			setQrText(result.ScanResult)
			console.log(qrText)

			setTimeout(()=>{
				document.querySelector("#button-click")?.click()
			}, 500)
		}catch(e){}

	};

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

	
	return (
		<IonPage>
			<IonHeader>
			</IonHeader>
			<IonContent fullscreen>
				{i()}
				{	!qrText &&
					<main className="max-w-6xl mx-auto pt-10 pb-36 px-2">
						<div className="w-center mx-auto text-center">
							<h1 className="text-2xl font-semibold mb-1">
								<span className="text-primary">Escanea</span> un código QR
							</h1>

							<div className="img-container-qr">
								<img src="img/scanner.png" />
							</div>
							<IonButton expand="block" onClick={startScan}>
								<UploadSimple size={24} className="mr-2" />
								Escanear
							</IonButton>
						</div>
					</main>
				}

				{	qrText &&
					<main className="max-w-6xl mx-auto pt-10 pb-36 px-2">
						<div className="w-center mx-auto text-center">
							<h1 className="text-2xl font-semibold mb-1">
								<span className="text-primary">Escanea</span> un código QR
							</h1>

							<div className="txt-qr">
								<OptionQR qr={qrText} ref={optionScannerRef} key={'scannerQR'}/>
							</div>
							<IonButton expand="block" onClick={startScan}>
								<UploadSimple size={24} className="mr-2" />
								Escanear
							</IonButton>
							<div id="button-click" onClick={()=>optionScannerRef.current.click()}></div>
						</div>
					</main>
				}
			</IonContent>
		</IonPage>
	);
};

export default ScannerQR;
