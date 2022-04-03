import {
    ReceiveMessageController
} from '../Controllers/WebSocketControllers/ReceiveMessageController.js';
import {
    SendMessageController
} from '../Controllers/WebSocketControllers/SendMessageController.js';

export class WebSocketService {
    constructor(id, connectionDisplayName, textModel) {
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
            this.ready = true;
            this.sendMessageController.sendMessage({
                id: this.id,
                connectionDisplayName: this.connectionDisplayName,
            })  
        }

        this.webSocket.onmessage = (message) => {
            const data = JSON.parse(message.data);
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
