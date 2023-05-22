import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');

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

    console.log(enteredName);
    // Resetting the enteredName so that when we submit the field becomes blank again.
    setEnteredName('');
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
