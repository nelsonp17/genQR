import { 
    IonContent, 
    IonPage,
    IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
    IonSelect,
    IonSelectOption,
    IonToast,
} from "@ionic/react";
import { ArrowLeft, Barcode, PencilSimple, DownloadSimple, ShareNetwork, FloppyDisk} from "@phosphor-icons/react";
import { tryGenerateQR, ParamsQRious, writeFile, isMobileDevice, downloadImageBase64, shareQrbase64, resizeTextarea } from '../../utils/Utils'
import { useEffect, useState } from "react";
import StorageService from '../../utils/StorageService'
import { useIonRouter } from '@ionic/react';
import { WriteFileResult } from "@capacitor/filesystem";

const GenerateQR: React.FC = () => {

    const [codeQR, setCodeQR] = useState('');
    const [nameQR, setNameQR] = useState('');
    const [qrString, setQrString] = useState('');
    const [disableBotton, setDisableBotton] = useState(false)
    const [editInputName, setEditInputName] = useState(false)
    const [inputName, setInputName] = useState('')
    const [optionAvanc, setOptionAvanc] = useState({
        level: 'H',
        size: 500,
    })
    const [toast, setToast] = useState({
		duration: 5000,
		isOpen: false,
		message: ''
	});

    const router = useIonRouter();
    const init = async () => {
        // obtener el valor del qr de la base de datos
        const storage = new StorageService()
        await storage.create()
        const _qrString = await storage.get('qr_string')
        setQrString(_qrString)
        const nameQrGenerate = await storage.get('name_qr_generate')
        setNameQR(nameQrGenerate)
        console.log(nameQrGenerate)

        await handleQR() // generamos el QR

    }
    const handleClickApply = ()=>{
        setCodeQR('')
        setDisableBotton(true);
        
        setTimeout(()=>{
            // generamos el qr
            const codeQR:ParamsQRious = {value: qrString, level: optionAvanc.level, size: optionAvanc.size}
            const codeReader = tryGenerateQR(codeQR)

            const codeQRBase64 = codeReader.toDataURL();
            setCodeQR(codeQRBase64)
            setDisableBotton(false)
        }, 500)
    }
    const handleQR = async ()=>{
        // generamos el qr
        const codeQR:ParamsQRious = {value: qrString, level: optionAvanc.level, size: optionAvanc.size}
        const codeReader = tryGenerateQR(codeQR)

        const codeQRBase64 = codeReader.toDataURL();
        setCodeQR(codeQRBase64)

        const textarea:HTMLTextAreaElement = document.querySelector('.text-qr-visor')
        if(textarea==null){ return}
		setTimeout(()=>resizeTextarea(textarea), 500)
    }
    const handleChangeInput = (event:any) => {
		const { value } = event.target;

    	setInputName(value); // Update specific property in state
	};
    const handleFocusOutInput = async (event:any) => {
		const { value } = event.target;

    	setInputName(value); // Update specific property in state
        if(value!=''){
            const storage = new StorageService()
            await storage.create()
            // nameQR
            await storage.set('name_qr_generate', value)
            await storage.remove(nameQR)
            //let r = await _storage.remove(`${nameQR}`)
            //console.log(`${nameQR}`, r)
            setNameQR(value)
            await storage.set(value, qrString)
        }

        setEditInputName(false)
	};
    const handleChange = (event:any) => {
		const { name, value } = event.target; // Destructure name and value from event object
    	setOptionAvanc((prevState) => ({ ...prevState, [name]: value })); // Update specific property in state
	};
    const handleDownload = async () => {
        const isMobile = await isMobileDevice()
        if(isMobile){
            const writeFileResult:WriteFileResult = await writeFile(codeQR, nameQR)
            if(writeFileResult.uri != '' || writeFileResult.uri != undefined){
                setToast((prev) => ({
                    ...prev,
                    message: 'Guardado en ' + writeFileResult.uri,
                    isOpen: true,
                }))
            }
        }else{
            downloadImageBase64(codeQR, nameQR)
        }
    }
    const handleShare = async () => {
        shareQrbase64(codeQR, nameQR)
    }
    useEffect(()=>{
        const create = async () => {
            await init()
        }
        create()
    }, [])
    
	return (
		<IonPage>
            <IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton routerLink={router.routeInfo.pushedByRoute || "/tabs/tab1"}>
							<ArrowLeft size={32}/>
						</IonButton>
					</IonButtons>
					
					<IonTitle>Generar QR</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen color='light'>
                <div className="bar-option-qr bg-primary text-white">
                    <div className="left">
                        <Barcode size={24} className="mr-2" />
                        {
                            editInputName && 
                            <input type="text" 
                                value={inputName} 
                                onChange={handleChangeInput}
                                className="input-simple"  
                                placeholder="Tamaño del QR" onBlur={handleFocusOutInput}
                            />
                            || 
                            <b>{inputName && nameQR || 'Nombre del QR'}</b>
                        }
                    </div>
                    <div className="right" onClick={()=>{setEditInputName(!editInputName)}}>
                        <PencilSimple size={24} />
                    </div>
                    
                </div>
				<div className="w-full bg-white flex">
                    <div className="qr-container p-5">
                        <div className="qr-code">
                            {codeQR && <img src={codeQR} />}
                        </div>
                        <div className="download-container">
                            <IonButton color={'secondary'} expand="block" onClick={handleDownload}>
                                <DownloadSimple size={20} className="mr-2" />
                                Descargar
                            </IonButton>
                            <IonButton color={'primary'} expand="block" onClick={handleShare}>
                                <ShareNetwork size={20} className="mr-2" />
                                Compartir
                            </IonButton>
                        </div>
                    </div>
                    <div className="qr-container py-5 pr-5">
                        <div className="text-qr">
                            <p className="text-2xs"><b>Texto:</b></p>
                            <textarea className="text-qr-visor" value={qrString} readOnly rows={12}></textarea>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white py-4 px-5">
                    <details>
                        <summary  className="text-2xs mb-4">Opciones avanzadas</summary>
                        
                        
                        <div className="mb-5">
                            <p className="text-xs mb-2">Cambia el nivel</p>
                            <IonSelect 
                            aria-label="Level" 
                            className="select-ionic-theme" 
                            value={optionAvanc.level}
                            name="level"
                            onIonChange={handleChange}
                            interface="action-sheet" 
                            placeholder="Select el nivel">
                                <IonSelectOption value="L">L</IonSelectOption>
                                <IonSelectOption value="M">M</IonSelectOption>
                                <IonSelectOption value="Q">Q</IonSelectOption>
                                <IonSelectOption value="H">H</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="size">Tamaño del QR</label>
                            <input type="number" 
                            id="size" 
                            name="size"
                            value={optionAvanc.size} 
                            onChange={handleChange}
                            className="input-theme"  
                            placeholder="Tamaño del QR"
                            max={10000}
                            />
                        </div>
                        <IonButton color={'primary'} onClick={handleClickApply} disabled={disableBotton}>
                            <FloppyDisk size={20} className="mr-2" />
                            Aplicar
                        </IonButton>

                    </details>
                    
                    


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
                
			</IonContent>
		</IonPage>
	);
};

export default GenerateQR;
