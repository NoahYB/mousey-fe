import {DocumentService} from '../Services/DocumentService.js'
export class TextModel {
	constructor(id) {
		this.domManipulation = new DocumentService();
		this.idToTextMap = {};
		this.id = id;
	}

	updateText(data) {
		this.setOrUpdateTextMap(data);
		const textToDisplay = 
			this.idToTextMap[data.id];
		this.domManipulation.displayText(
			data.id,
			`${data.connectionDisplayName} says: ${textToDisplay}`,
		);
		this.webSocketService.sendMessage(
			{
				id: data.id,
				text: textToDisplay,
				connectionDisplayName: data.connectionDisplayName,
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