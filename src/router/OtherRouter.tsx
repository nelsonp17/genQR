import { Route, RouteComponentProps } from "react-router-dom";
import {
	IonRouterOutlet,
} from "@ionic/react";
import GenerateQR from "../pages/generateQr/GenerateQR";


const OtherRouter: React.FC<RouteComponentProps> = ({ match }) => (
    <IonRouterOutlet>
        <Route path={`${match.url}/genQR/:operation`} component={GenerateQR}></Route>
    </IonRouterOutlet>
			
);

export default OtherRouter;
