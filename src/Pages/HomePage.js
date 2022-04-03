import {
	WebSocketService
} from '../Services/WebSocketService.js'

import {
	InputService
} from '../Services/InputService.js'

import {TextModel} from '../Models/TextModel.js'

function main() {
	const id = Date.now();
	var textModel = new TextModel(id);
	var webSocketService = 
		new WebSocketService(id, window.localStorage.getItem('name'), textModel);
	var inputService = 
		new InputService(id, textModel);
	textModel.setWebSocketService(webSocketService);
}

main();