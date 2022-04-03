export function validateKeyboardEvent(event) {
	if (event.key === 'Backspace') {
		return {
			keyName:  'Backspace',
			char: '',
		}
	}
	const char = event.key.length > 1 
		? '': event.key;
	return {
		keyName: event.key,
		char,
	}
}