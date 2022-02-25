export class SendMessageController {
	constructor(webSocket) {
		this.webSocket = webSocket;
	}
	sendMessage(message) {
	    this.webSocket.send(
	    	JSON.stringify({data:message})
	    );
	}
}
