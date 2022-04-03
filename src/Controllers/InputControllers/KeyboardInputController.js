export class KeyboardInputController {
	constructor(textModel) {
		this.textModel = textModel;
	}

	onKeyPress(message) {
		const {data, id} = message;
		this.textModel.updateText({
			text: data.char,
			connectionDisplayName: window.localStorage.getItem('name'),
			id,
		});
	}
}