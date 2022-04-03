import {DocumentService} from '../Services/DocumentService.js'

export class TextModel {
	constructor(id) {
		this.domManipulation = new DocumentService();
		this.idToTextMap = {};
		this.id = id;
		this.connectionDisplayName = window.localStorage.getItem('name');
	}

	deleteDisplayText(data) {
		console.log(this.idToTextMap);
		this.idToTextMap[data.id] = this.idToTextMap[data.id].slice(0, -1);
		this.domManipulation.displayText(
			data.id,
			`${this.connectionDisplayName} says: ${this.idToTextMap[data.id]}`,
		);
		this.webSocketService.sendMessage(
			{
				id: data.id,
				text: this.idToTextMap[data.id],
				connectionDisplayName: this.connectionDisplayName,
			}
		);
	}

	updateText(data) {
		this.setOrUpdateTextMap(data);
		console.log(this.idToTextMap);
		const textToDisplay = 
			this.idToTextMap[data.id];
		this.domManipulation.displayText(
			data.id,
			`${this.connectionDisplayName} says: ${textToDisplay}`,
		);
		this.webSocketService.sendMessage(
			{
				id: data.id,
				text: textToDisplay,
				connectionDisplayName: this.connectionDisplayName,
			}
		);
	}

	updateReceivedText(data) {
		this.idToTextMap[data.id] = data.text;
		this.domManipulation.displayText(
			data.id,
			`${data.connectionDisplayName} says: ${this.idToTextMap[data.id]}`,
		);
	}

	setOrUpdateTextMap(data) {
		const {
			id, text
		} = data;
		if (this.idToTextMap[id]) {
			this.idToTextMap[id] += text;
		} else {
			this.idToTextMap[id] = text;
		}
	}

	setWebSocketService(wsc) {
		this.webSocketService = wsc;
	}
}