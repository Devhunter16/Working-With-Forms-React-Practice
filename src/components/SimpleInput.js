import { useState } from 'react';
// Importing our custom input hook
import useInput from '../hooks/use-input';

const SimpleInput = () => {

  // Pulling everything out of our custom hook and assigning the appropriate names
  const { 
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  // useInput takes a function as an argument, the function we're passing in makes sure
  // that the user is not trying to submit the form with an empty field
  } = useInput(value => value.trim() !== '');

  const { 
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  // useInput takes a function as an argument, the function we're passing in makes sure
  // that the user is not trying to submit the form with an empty field
  } = useInput(value => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    // Keeping the browser from automatically sending an http request to the server
    // serving this website when the form is submitted because we don't have a server
    // and it would reload the whole React application and we would lose our state.
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    // Resetting the input fields using the reset() function pulled out of our custom 
    // useInput() hook.
    resetNameInput();
    resetEmailInput();
  };

  // Changing the className here based on whether or not the values = true or 
  // false so that the css styling will change depending on true or false
  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  // onBlur is a built-in event that occurs the input loses focus (whenever a user clicks
  // away from the input)
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Email must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
