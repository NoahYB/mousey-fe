import {
	WebSocketConductor
} from './Conductors/WebSocketConductor.js'

import {
	InputConductor
} from './Conductors/InputConductor.js'

import {TextModel} from '../../Models/TextModel.js'

function main() {
	console.log('loading');
	const id = Date.now();
	var textModel = new TextModel(id);
	var webSocketConductor = 
		new WebSocketConductor(id, 'Emily', textModel);
	var inputConductor = 
		new InputConductor(id, textModel);
	textModel.setWebSocketConductor(webSocketConductor);
}

main();