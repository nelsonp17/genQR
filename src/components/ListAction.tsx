import { 
	IonItem,
	IonList,
	IonThumbnail,
    IonLabel,
} from "@ionic/react";
import { ArrowLeft, Check, } from "@phosphor-icons/react";


export default function (props:any) {
	return (
		<>
            <IonList className="option-items" id="insert-list">
				{props.listAction.map(item=>
                    <IonItem button={true} key={item.title} lines={item.lines} onClick={item.handleClick}>
                        <IonThumbnail slot="start">
                            { item.icon }
                        </IonThumbnail>
                        <IonLabel>{item.title}</IonLabel>
                    </IonItem>
                )}
			</IonList>
			
		</>
	);
};

