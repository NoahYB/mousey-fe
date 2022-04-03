import { 
    KeyboardInputController 
} from '../Controllers/InputControllers/KeyboardInputController.js'
import {
    validateKeyboardEvent 
} from '../Validators/InputValidators.js'

export class InputService {
    constructor(id, textModel) {
        this.id = id;
        this.textModel = textModel;
        this.keyboardInputController = 
            new KeyboardInputController(this.textModel);
        this.intializeCallbacks();
    }

    intializeCallbacks() {
        document.onkeypress = (event) => {
            const data =
                validateKeyboardEvent(event);
            this.keyboardInputController
                .onKeyPress({data, id: this.id});
        }
    } 
}
