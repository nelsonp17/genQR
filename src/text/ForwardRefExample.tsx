import {
	IonContent,
	IonPage,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
	IonLabel,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonItem,
	IonList,
	IonThumbnail,
} from "@ionic/react";
import { ArrowLeft, Check } from "@phosphor-icons/react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Component, forwardRef, ReactElement, useEffect, useState } from "react";
import { getActionQR, resizeTextarea } from "../utils/Utils";
import ListAction from "../components/ListAction";
import { withStuffFunction } from "../utils/Hooc";
import React from "react";

interface item {
	title: string;
	icon: ReactElement;
	lines: string;
}
export const OptionQR: React.FC = forwardRef((props, ref) => {
	const qr = props.qr;
	const [items, setItems] = useState([] as item[]);

	const handleLoad = () => {
		setItems([] as item[]);
		const textareaT = document.querySelector("#text-qr-code") || null;
		if (textareaT) {
			const textarea: Element = textareaT;
			resizeTextarea(textarea);
		}
		const action = getActionQR(qr || "");
		const icon = (
			<img
				alt="Silhouette of mountains"
				src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
			/>
		);
		const max = action.length - 1;
		console.log(action);

		let list: item[] = [];
		action.forEach((value: string, index: number) => {
			let newItem: item = {
				title: value,
				icon,
				lines: "full",
			};
			if (max == index) {
				newItem.lines = "none";
			}
			list.push(newItem);
		});

		return list;
	};

	useEffect(() => {
		if (qr != null || qr != undefined) {
			const list = handleLoad();
			setItems(list);
		}
	}, []);

	
	return (
		<div>
			<div className="qr-container">
				<div className="qr-code-container">
					{qr && <p>Texto Encontrado:</p>}
					<textarea
						id="text-qr-code"
						value={qr}
						readOnly
					></textarea>
					<div className="divider"></div>
					<ListAction listAction={items} />
				</div>
			</div>
		</div>
	);
});

class OptionQR3 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
		};
	}

	handleLoad = () => {
		const { qr } = this.props;
		this.setItems([] as item[]);
		const textareaT = document.querySelector('#text-qr-code') || null
		if(textareaT){
			const textarea:Element = textareaT
			resizeTextarea(textarea)
		}
		const action = getActionQR(qr || '')
		const icon = (<img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg"/>)
		const max = action.length -1
		console.log(action)

		
		let list:item[] = []
		action.forEach((value:string, index:number)=>{
			let newItem:item = {
				title: value,
				icon,
				lines: 'full'
			}
			if(max==index){
				newItem.lines = 'none'
			}
			list.push(newItem)
		})
		return list; // Asegúrate de definir 'list'
	};

	componentDidMount() {
		const { qr } = this.props;
		if (qr != null && qr !== undefined) {
			const list = this.handleLoad();
			this.setState({ items: list });
		}
	}

	render() {
		const { qr } = this.props;
		const { items } = this.state;

		return (
			<>
				<div className="qr-container">
					<div className="qr-code-container">
						{qr && <p>Texto Encontrado:</p>}
						<textarea
							id="text-qr-code"
							value={qr}
							readOnly
						></textarea>
						<div className="divider"></div>
						<ListAction listAction={items} />
					</div>
				</div>
			</>
		);
	}
}

//export default withStuffFunction(OptionQR3);
export default OptionQR;