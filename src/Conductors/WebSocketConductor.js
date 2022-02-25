import {
    ReceiveMessageController
} from '../Controllers/WebSocketControllers/ReceiveMessageController.js';
import {
    SendMessageController
} from '../Controllers/WebSocketControllers/SendMessageController.js';

export class WebSocketConductor {
    constructor(id, connectionDisplayName, textModel) {
        console.log('register git change');
        this.webSocket = new WebSocket(
            'wss://brintonliteraryagency.org/wss/', 
            'protocolOne'
        );

        this.textModel = textModel; 

        this.connectionDisplayName = connectionDisplayName;

        this.id = id;

        this.receiveMessageController = 
            new ReceiveMessageController(this.textModel);

        this.sendMessageController = 
            new SendMessageController(this.webSocket);

        this.ready = false;

        this.intializeCallbacks();
    }

    intializeCallbacks() {
        this.webSocket.onopen = (message) => {
            console.log('opening');
            this.ready = true;
            this.sendMessageController.sendMessage({
                id: this.id,
                connectionDisplayName: this.connectionDisplayName,
            })  
        }

        this.webSocket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            if (data.id === this.id) return;
            if (data.text) {
                this.receiveMessageController
                    .receiveTextMessage(data);
            }
        }
    }

    sendMessage(message) {
        const validatedMessage = message;
        this.sendMessageController
            .sendMessage(validatedMessage);
    }
}
