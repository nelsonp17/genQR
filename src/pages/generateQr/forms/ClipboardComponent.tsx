import { useEffect, useState } from "react";
import { Clipboard } from '@capacitor/clipboard';
import { IonButton } from "@ionic/react";
import { Clipboard as ClipboardIcon } from "@phosphor-icons/react";

const ClipboardComponent: React.FC = ({ onTextChange }: any) => {
	const [inputValue, setInputValue] = useState('');
	const [onMounted, setOnMounted] = useState(false);

	const checkClipboard = async () => {
		const { type, value } = await Clipboard.read();
		
		console.log(`Got ${type} from clipboard: ${value}`);

		setInputValue(value);
		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(value);
	};

	useEffect(()=>{
			try{
				if(!onMounted){
					checkClipboard()
					onTextChange(inputValue)
					
					if(inputValue!=''){
						setOnMounted(true)
					}
				}
			}catch(e){}
	})
	
	const handleChange = (event:any) => {
		setInputValue(event.target.value);

		// Invocar la función prop onTextChange para notificar al padre
		onTextChange(event.target.value);
	};
	  
	return (
		<>
			
			<textarea 
			value={inputValue}
			onChange={handleChange}
			placeholder="Texto encontrado"
			className="input-theme" cols={9} rows={12}
			></textarea>
			<div className="flex justify-end">
				<IonButton onClick={checkClipboard} color={'secondary'}>
					<ClipboardIcon size={18} className="mr-1"/>Pegar
				</IonButton>
			</div>
		</>
	);
};

export default ClipboardComponent;
