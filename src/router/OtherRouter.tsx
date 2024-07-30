import { Route, RouteComponentProps } from "react-router-dom";
import {
	IonRouterOutlet,
} from "@ionic/react";
import GenerateQR from "../pages/generateQr/GenerateQR";
import VisorQR from "../pages/generateQr/VisorQR";
//import OptionQR from "../pages/OptionQR";
//<Route path={`${match.url}/optionQR`} component={OptionQR}></Route>

const OtherRouter: React.FC<RouteComponentProps> = ({ match }) => (
    <IonRouterOutlet>
        <Route path={`${match.url}/genQR/:operation`} component={GenerateQR}></Route>
        <Route path={`${match.url}/visorQR`} component={VisorQR}></Route>
    </IonRouterOutlet>
			
);

export default OtherRouter;
