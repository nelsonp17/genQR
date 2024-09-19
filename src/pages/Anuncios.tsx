import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
    IonSelect,
    IonSelectOption,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { AdModeType, InterstitialEventName, Startio } from "../startio/Startio";
import { AdError, AdLoadInfo } from "../startio/events/share";
import { WebView } from "@capacitor/core";
//import { WebView } from 'react-native-webview';

const Anuncios: React.FC = () => {
    const banner = useRef(null);
    interface eventResponse {
        name: String | InterstitialEventName,
        message: String,
        _toString: String,
    }
	const [ev, setEv] = useState<eventResponse[]>([]);
    const [settingInterstitial, setSettingInterstitial] = useState({
        autoShow: false,
        adMode: AdModeType.AUTOMATIC
    })
    const [second, setSecond] = useState<number>(60);

	const showActivity = async ()=>{
		await Startio.intersticial()
	}
	const loadInterstitial = async ()=>{
        await Startio.loadInterstitial(settingInterstitial);
	}
	const showInterstitial = async ()=>{
		await Startio.showInterstitial();
	}

    const loadSetting = async () => {
        await Startio.initialize({
			returnAdsEnabled: true,
			isDev: true,
			appId: "206837052"
		});
    }
    const timeFrequency = async () => {
        await Startio.timeFrequency({second});
    }
    

    useEffect(()=>{
    	const _init = async () => {
			await loadSetting();
    	}
    	_init()

        // events interstitial
		Startio.addListener(InterstitialEventName.Loaded, (info: AdLoadInfo) => {
                let message = "Evento disparado"
                if(settingInterstitial.autoShow == false){
                    Startio.showInterstitial()
                    message += ", además auto-mostre el anuncio desde el evento"
                }
                
                let response:eventResponse = {
                    name: InterstitialEventName.Loaded,
                    message,
                    _toString: `ID ad: ${info.adId}, State: ${info.state}`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
			},
		);
        Startio.addListener(InterstitialEventName.FailedToReceiveAd, (error: AdError) => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.FailedToReceiveAd,
                    message,
                    _toString: `Code error: ${error.code}, Message: ${error.message}`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );
        Startio.addListener(InterstitialEventName.Clicked, () => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.Clicked,
                    message,
                    _toString: `SIN DATOS DEL JAVA`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );
        Startio.addListener(InterstitialEventName.Displayed, () => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.Displayed,
                    message,
                    _toString: `SIN DATOS DEL JAVA`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );
        Startio.addListener(InterstitialEventName.NotDisplayed, () => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.NotDisplayed,
                    message,
                    _toString: `SIN DATOS DEL JAVA`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );
        Startio.addListener(InterstitialEventName.Hidden, () => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.Hidden,
                    message,
                    _toString: `SIN DATOS DEL JAVA`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );
        Startio.addListener(InterstitialEventName.RewardedVideoCompleted, () => {
                let message = "Evento disparado"

                let response:eventResponse = {
                    name: InterstitialEventName.RewardedVideoCompleted,
                    message,
                    _toString: `SIN DATOS DEL JAVA`
                }
                let tmp = ev;
                tmp.push(response)
                setEv(tmp)
            },
        );

    }, [])

    function handleChangeSettingInterstital(event:any) {
        const { name, value } = event.target; // Destructure name and value from event object
        setSettingInterstitial((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    function handleChangeSecond(event:any){
        const { value } = event.target; 
        setSecond(parseInt(value));
    }

    const listItems = (list:eventResponse[]) => list.map(item=>
        <ul>
            <li>Se disparo el evento: { item.name }</li>
            <li>ToString: { item._toString }</li>
            <li>Mensaje: { item.message }</li>
        </ul>
    )

	
	return (
		<IonPage>
			<IonContent fullscreen>
                { 
                    ev.length > 0 && listItems(ev)
                }

                <IonButton onClick={loadSetting} color={'primary'}>
					Iniciar
				</IonButton>                
                <IonButton onClick={showActivity} color={'secondary'}>
					Show Activity
				</IonButton>
                <IonButton onClick={()=> {
                    const vacio:eventResponse[] = []
                    setEv(vacio)
                }} color={'primary'}>
					Limpiar message events
				</IonButton>  

                <p className="mt-5">Configuraciones del intersticial</p>
                <div className="my-3">
                    <label htmlFor="autoShow">
                        Auto Mostrar anuncio despues de cargar
                        <IonSelect className={'select-ionic-theme'} name={'autoShow'} value={settingInterstitial.autoShow} id={'autoShow'} 
                        onBlur={handleChangeSettingInterstital} onChange={handleChangeSettingInterstital} aria-label={"Seleccionar"} interface="action-sheet" placeholder={"Seleccionar"}>
                            <IonSelectOption value={true}>Si</IonSelectOption>
                            <IonSelectOption value={false}>No</IonSelectOption>
                        </IonSelect>
                    </label>
                </div>
                <div className="my-3">
                    <label htmlFor="adMode">
                        Tipo de anuncio
                        <IonSelect className={'select-ionic-theme'} name={'adMode'} value={settingInterstitial.adMode} id={'adMode'} 
                        onBlur={handleChangeSettingInterstital} onChange={handleChangeSettingInterstital} aria-label={"Seleccionar"} interface="action-sheet" placeholder={"Seleccionar"}>
                            <IonSelectOption value={AdModeType.AUTOMATIC}>{AdModeType.AUTOMATIC}</IonSelectOption>
                            <IonSelectOption value={AdModeType.FULLPAGE}>{AdModeType.FULLPAGE}</IonSelectOption>
                            <IonSelectOption value={AdModeType.VIDEO}>{AdModeType.VIDEO}</IonSelectOption>
                            <IonSelectOption value={AdModeType.REWARDED_VIDEO}>{AdModeType.REWARDED_VIDEO}</IonSelectOption>
                            <IonSelectOption value={AdModeType.OFFERWALL}>{AdModeType.OFFERWALL}</IonSelectOption>
                            <IonSelectOption value={AdModeType.OVERLAY}>{AdModeType.OVERLAY}</IonSelectOption>
                        </IonSelect>
                    </label>
                </div>
				<IonButton onClick={loadInterstitial} color={'primary'}>
					Load Insterstitial
				</IonButton>
				<IonButton onClick={showInterstitial} color={'secondary'}>
					Show Insterstitial
				</IonButton>
                
                <p className="mt-5">Configuraciones del timeFrequency</p>
                <div className="my-3">
                    <label htmlFor="autoShow">
                        Valor en segundos
                        <input type="number" name="second" className="input-theme" value={second} onChange={handleChangeSecond} />
                    </label>
                </div>
				<IonButton expand="block" onClick={timeFrequency} color={'tertiary'}>
					Mostrar instertitial con frecuencia
				</IonButton>

            </IonContent>
		</IonPage>
	);
};

export default Anuncios;
