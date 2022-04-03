import {
	DocumentService,
} from '../Services/DocumentService.js'

const documentService = new DocumentService();

function main() {
	const link = documentService.element('link');
	console.log(link)
	link.onclick = setName;
}

function setName() {
	const name =  documentService.element('alias');
	window.localStorage.setItem('name', name.value);
}
main();