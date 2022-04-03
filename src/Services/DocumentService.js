export class DocumentService {
	
	constructor() {

	}

    displayText(elementId, message) {
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

    element(elementId) {
        return document.getElementById(elementId);
    }
}