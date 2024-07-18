import { 
    IonContent, 
    IonPage,
    IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
} from "@ionic/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link, RouteComponentProps } from "react-router-dom";
import ClipboardComponent from "./forms/ClipboardComponent";
import UrlComponent from "./forms/UrlComponent";
import TextComponent from "./forms/TextComponent";
import { useState } from "react";
import { formatDataQR } from '../../utils/Utils'

interface GenerateQRPageProps extends RouteComponentProps<{ operation: string }> {}

const GenerateQR: React.FC<GenerateQRPageProps> = ({match}) => {

	// Use a more descriptive variable name
	const selectedOperation = match.params.operation;

	const [textData, setTextData] = useState("");
	const handleTextChange = (newValue: string) => {
		const formattedData = formatDataQR(newValue, selectedOperation)
		setTextData(formattedData.toString);
	};

	// Render the appropriate component based on operation
    const renderComponent  = () => {
		switch(selectedOperation){
			case 'clipboard':
				return <ClipboardComponent onTextChange={handleTextChange}/>;
			case 'url':
				return <UrlComponent onTextChange={handleTextChange}/>;
			case 'text':
				return <TextComponent onTextChange={handleTextChange}/>;
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
					
					<IonTitle>Atras</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen color='light'>
                <div className="py-5 px-4">
					User {selectedOperation}
					{renderComponent ()}
					<p className="pt-8">{textData}</p>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default GenerateQR;
