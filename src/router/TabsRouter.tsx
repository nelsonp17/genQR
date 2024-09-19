import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import {
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";
import { House, QrCode, UploadSimple } from "@phosphor-icons/react";
import Home from "../pages/Home";
import ScannerQR from "../pages/ScannerQR";
import UploadFile from "../pages/UploadFile";
import Anuncios from "../pages/Anuncios";
import StorageService from "../utils/StorageService";


const App: React.FC<RouteComponentProps> = ({ match }) => {
    
    const onClickHandle = async () => {
        const storage = new StorageService()
        await storage.create()
        await storage.set('reset_view', 'true')
    }
    return (
	<IonTabs>
        <IonRouterOutlet>
            <Route path={`${match.url}/tab1`} component={Home}></Route>
            <Route path={`${match.url}/tab2`} component={ScannerQR}></Route>
            <Route path={`${match.url}/tab3`} component={UploadFile}></Route>
            <Route path={`${match.url}/tab4`} component={Anuncios}></Route>
            
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
            <IonTabButton tab="/tabs/tab1" href="/tabs/tab1" onClick={onClickHandle}>
                <House size={32} />
                <IonLabel>Generar QR</IonLabel>
            </IonTabButton>

            <IonTabButton tab="/tabs/tab2" href="/tabs/tab2" onClick={onClickHandle}>
                <QrCode size={32} />
                <IonLabel>Escanear QR</IonLabel>
            </IonTabButton>

            <IonTabButton tab="/tabs/tab3" href="/tabs/tab3" onClick={onClickHandle}>
                <UploadSimple size={32} />
                <IonLabel>Escanear Archivo</IonLabel>
            </IonTabButton>

            <IonTabButton tab="/tabs/tab4" href="/tabs/tab4" onClick={onClickHandle}>
                <UploadSimple size={32} />
                <IonLabel>Test anuncios</IonLabel>
            </IonTabButton>
        </IonTabBar>
        

    </IonTabs>
)};

export default App;
