export class ReceiveMessageController {
	constructor(textModel) {
		this.textModel = textModel;
	}

	receiveTextMessage(data) {
	    const {
	    	connectionDisplayName,
	    	text,
	    	id,
	    } = data;
		this.textModel.updateReceivedText({
			text,
			connectionDisplayName,
			id,
		});
    }
};
