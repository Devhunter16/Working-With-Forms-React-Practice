import { useState } from 'react'; 

// Custom hook I created to manage all of the form inputs, takes a function called
// validateValue. More on this in the SimpleInput.js file
const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    // Has the user touched the input yet?
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid; 

    const valueChangeHandler = (event) => {
        // event.target gives you the element that triggered the event. So, 
        // event.target.value retrieves the value of that element (an input field, in this
        // case). On any input change, we are setting enteredValue to the value of the 
        // input field. This updates on each keystroke.
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        // The user touched the input.
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    // Returning an object with some values and some functions we'll want to call 
    // elsewhere.
    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;