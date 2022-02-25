export class TextRenderer {
	
	constructor() {

	}

	displayText(elementId, message) {
		console.log(`element id ${message}`);
		const element = 
			document.getElementById(elementId) ?
			document.getElementById(elementId) :
			this.createNewElement(elementId);
		element.innerHTML = message;
	}

	createNewElement(elementId) {
		const newElement = 
			document.createElement('div');
		newElement.id = elementId;
		document.body.appendChild(newElement);
		return newElement;
	}
}
