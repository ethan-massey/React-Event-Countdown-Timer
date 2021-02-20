import React, { useState } from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const TenDaysFromNow = () => {
  var today = new Date();
  today.setDate(today.getDate() + 10); 
  return new Date(today.getFullYear(), today.getMonth(), today.getDay(), 0, 0, 0);
}


export default function Home() {
  // for event name input
  const handleNameChange = (event) => {
    setEventDetails({...eventDetails, Name: event.target.value});
  }

  // for date or time input
  const handleDateTimeChange = (date) => {
    console.log(date);
    setEventDetails({...eventDetails, Date: date});
  }

  const [eventDetails, setEventDetails] = useState({Name: 0, Date: TenDaysFromNow()})
  const [userInputForms, setUserInputForms] = useState({
    NameForm: <TextField label="Event Name" name="Name" variant="outlined" onChange={handleNameChange}/>,
    DateForm: <KeyboardDatePicker
    disableToolbar
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    id="date-picker-inline"
    label="Event Date"
    name="Date"
    value={eventDetails.Date}
    onChange={handleDateTimeChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}/>,
    TimeForm: <KeyboardTimePicker
    margin="normal"
    id="time-picker"
    label="Event Time (Optional)"
    name="Time"
    value={eventDetails.Date}
    onChange={handleDateTimeChange}
    KeyboardButtonProps={{
      'aria-label': 'change time',
    }}/>
  })

  const validateUserInputs = () => {
    // validate name
    if(eventDetails.Name == ""){
      setUserInputForms({...userInputForms, NameForm: <TextField label="Event Name" error name="Name" helperText="Event name can't be empty." variant="outlined" onChange={handleNameChange}/>})
    }
    // validate date & time
    var today = new Date();
    if(eventDetails.Date <= today){
      setUserInputForms({...userInputForms, 
        DateForm: <KeyboardDatePicker
        disableToolbar
        error
        helperText="Event date must be in the future."
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Event Date"
        name="Date"
        value={eventDetails.Date}
        onChange={handleDateTimeChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}/>})
    }
  }

  // upon submitting event
  const handleSubmit = () => {
    // validate
    var isValidInput = validateUserInputs();
    // now get to change to timer view somehow
    if (isValidInput) {

    // show error messages over input
    }else{

    }
  }

  return (
    <div>
      <h1>Countdown timer</h1>
      <h4>Enter event details below.</h4>
      <form>
        {userInputForms.NameForm}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {userInputForms.DateForm}
          {userInputForms.TimeForm}
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Start Timer!
        </Button>
      </form>
    </div>
  )
}
