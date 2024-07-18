import { IonContent, IonPage } from "@ionic/react";
import { IonItem, IonLabel, IonList, IonNote, IonCard, IonCardContent, IonTitle, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Clipboard, LinkSimple, TextT, User, At, ChatDots, MapPinLine, Phone, CalendarDots, WifiHigh, Article } from "@phosphor-icons/react";
const Home: React.FC = () => {
    const list = [
        { title: 'Contenido del portapapeles', icon: <Clipboard size={32} slot="start"/>, link: '/v1/genQR/clipboard' },
        { title: 'URL', icon: <LinkSimple size={32} slot="start"/>, link: '/v1/genQR/url' },
        { title: 'Texto', icon: <TextT size={32} slot="start"/>, link: '/v1/genQR/text' },
        { title: 'Contacto', icon: <User size={32} slot="start"/>, link: '/v1/genQR/contact' },
        { title: 'Dirección de correo electrónico', icon: <At size={32} slot="start"/>, link: '/v1/genQR/email' },
        { title: 'Dirección SMS', icon: <ChatDots size={32} slot="start"/>, link: '/v1/genQR/sms' },
        { title: 'Coordenadas geográficas', icon: <MapPinLine size={32} slot="start"/>, link: '/v1/genQR/coord' },
        { title: 'Número de teléfono', icon: <Phone size={32} slot="start"/>, link: '/v1/genQR/phone' },
        { title: 'Calendario', icon: <CalendarDots size={32} slot="start"/>, link: '/v1/genQR/calendar' },
        { title: 'Wifi', icon: <WifiHigh size={32} slot="start"/>, link: '/v1/genQR/wifi' },
        { title: 'Personalizado', icon: <Article size={32} slot="start"/>, link: '/v1/genQR/article' },
      ];
    const listItems = list.map(item=>
        <IonItem button={true} key={item.title} routerLink={item.link}>
            { item.icon }
            <IonLabel> {item.title}</IonLabel>
        </IonItem>
    )
	return (
		<IonPage>
			<IonContent fullscreen color='light'>
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle className="px-4 pt-3">Crear código QR</IonCardTitle>
                        <IonList lines="full" inset={true}>{listItems}</IonList>
                    </IonCardContent>
                </IonCard>
                
			</IonContent>
		</IonPage>
	);
};

export default Home;
