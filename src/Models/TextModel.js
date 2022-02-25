import {TextRenderer} from '../../Views/RenderViews/RenderText.js'
export class TextModel {
	constructor(id) {
		this.textRenderer = new TextRenderer();
		this.idToTextMap = {};
		this.id = id;
	}

	updateText(data) {
		this.setOrUpdateTextMap(data);
		const textToDisplay = 
			this.idToTextMap[data.id];
		this.textRenderer.displayText(
			data.id,
			`${data.connectionDisplayName} says: ${textToDisplay}`,
		);
		this.webSocketConductor.sendMessage(
			{
				id: data.id,
				text: textToDisplay,
				connectionDisplayName: data.connectionDisplayName,
			}
		);
	}

	updateReceivedText(data) {
		this.idToTextMap[data.id] = data.text;
		this.textRenderer.displayText(
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

	setWebSocketConductor(wsc) {
		this.webSocketConductor = wsc;
	}
}