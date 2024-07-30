import { IonContent, IonPage } from "@ionic/react";
import { IonItem, IonLabel, IonList, IonNote, IonCard, IonCardContent, IonTitle, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Clipboard, LinkSimple, TextT, User, At, ChatDots, MapPinLine, Phone, CalendarDots, WifiHigh, Article, Barcode, ClockCounterClockwise } from "@phosphor-icons/react";
import { useEffect } from "react";
import { PermissionCalendar } from "../utils/CalendarService";

const Home: React.FC = () => {
    useEffect(()=>{
        const init = async ()=> await PermissionCalendar();
        init()
    }, [])
    const iconSize:number = 24;
    const list = [
        { title: 'Contenido del portapapeles', icon: <Clipboard size={iconSize} className="mr-3"/>, link: '/v1/genQR/clipboard' },
        { title: 'URL', icon: <LinkSimple size={iconSize} className="mr-3"/>, link: '/v1/genQR/url' },
        { title: 'Texto', icon: <TextT size={iconSize} className="mr-3"/>, link: '/v1/genQR/text' },
        { title: 'Contacto', icon: <User size={iconSize} className="mr-3"/>, link: '/v1/genQR/contact' },
        { title: 'Dirección de correo electrónico', icon: <At size={iconSize} className="mr-3"/>, link: '/v1/genQR/email' },
        { title: 'Dirección SMS', icon: <ChatDots size={iconSize} className="mr-3"/>, link: '/v1/genQR/sms' },
        //{ title: 'Coordenadas geográficas', icon: <MapPinLine size={iconSize} className="mr-3"/>, link: '/v1/genQR/coord' },
        { title: 'Número de teléfono', icon: <Phone size={iconSize} className="mr-3"/>, link: '/v1/genQR/phone' },
        { title: 'Calendario', icon: <CalendarDots size={iconSize} className="mr-3"/>, link: '/v1/genQR/calendar' },
        { title: 'Wifi', icon: <WifiHigh size={iconSize} className="mr-3"/>, link: '/v1/genQR/wifi' },
        //{ title: 'Personalizado', icon: <Article size={iconSize} className="mr-3"/>, link: '/v1/genQR/article' },
    ];
    const listItems = list.map(item=>
        <IonItem button={true} key={item.title} routerLink={item.link}>
            { item.icon }
            <IonLabel> {item.title}</IonLabel>
        </IonItem>
    )

    const list2 = [
        { title: 'Historial', icon: <ClockCounterClockwise size={iconSize} className="mr-3"/>, link: '/v1/genQR/clipboard' },
        //{ title: 'Código de Barras', icon: <Barcode size={iconSize} className="mr-3"/>, link: '/v1/genQR/wifi' },
        //{ title: 'Personalizado', icon: <Article size={iconSize} className="mr-3"/>, link: '/v1/genQR/article' },
      ];
    const list2Items = list2.map(item=>
        <IonItem button={true} key={item.title} routerLink={item.link}>
            { item.icon }
            <IonLabel> {item.title}</IonLabel>
        </IonItem>
    )
    /**
     *  <IonCardTitle className="title mt-10">Otros</IonCardTitle>
        <IonList lines="none" inset={true} className="list">{list2Items}</IonList>
     */
	return (
		<IonPage>
			<IonContent fullscreen>
                <IonCard className="page-home">
                    <IonCardContent>
                        <IonCardTitle className="title">
                            <h1 className="text-2xl font-semibold mb-1">
                                <span className="text-primary">Crear</span> código QR
							</h1>
                            
                        </IonCardTitle>
                        <IonList lines="none" inset={true} className="list">{listItems}</IonList>
                        
                    </IonCardContent>
                </IonCard>
                <wbr></wbr>
                
			</IonContent>
		</IonPage>
	);
};

export default Home;
