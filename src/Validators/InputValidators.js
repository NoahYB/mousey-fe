export function validateKeyboardEvent(event) {
	const char = event.key.length > 1 
		? 'Special Character': event.key;
	return {
		keyName: event.key,
		char,
	}
}