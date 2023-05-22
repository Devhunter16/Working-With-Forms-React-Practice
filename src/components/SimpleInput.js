import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = (event) => {
    // event.target gives you the element that triggered the event. So, 
    // event.target.value retrieves the value of that element (an input field, in this
    // case). On any input change, we are setting enteredName to the value of the 
    // input field. This updates on each keystroke.
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    // Keeping the browser from automatically sending an http request to the server
    // serving this website when the form is submitted because we don't have a server
    // and it would reload the whole React application and we would lose our state.
    event.preventDefault();

    // Performing some client-side validation by making sure they cannot submit with an
    // empty input field.
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      // Returning from the overall function and cancelling the function execution.
      return;
    };

    // If we get past the "if" statement above, we set enteredNameIsValid to "true".
    setEnteredNameIsValid(true);

    console.log(enteredName);
    // Resetting the enteredName so that when we submit the field becomes blank again.
    setEnteredName('');
  };

  // Changing the className here based on whether or not enteredNameIsValid = true or 
  // false so that the css styling will change depending on true or false
  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
