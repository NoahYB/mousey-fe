export class KeyboardInputController {
	constructor(textModel) {
		this.textModel = textModel;
		this.specialCharacters = {
			'Backspace' : this.textModel.deleteDisplayText,
		}
	}

	onKeyPress(message) {
		const {data, id} = message;
		if (this.specialCharacters[data.keyName]) {
			this.textModel.deleteDisplayText({id});
			return;
		}
		this.textModel.updateText({
			text: data.char,
			id,
		});
	}
}