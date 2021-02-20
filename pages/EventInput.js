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


const oneDayFromNow = () => {
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  // set to midnight
  tomorrow.setHours(0,0,0,0);
  return tomorrow;
}

export default function EventInput(props) {
  const [eventDetails, setEventDetails] = useState({Name: 0, Date: oneDayFromNow()})
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  // for event name input
  const handleNameChange = (event) => {
    setEventDetails({...eventDetails, Name: event.target.value});
  }

  // for date or time input
  const handleDateTimeChange = (date) => {
    setEventDetails({...eventDetails, Date: date});
  }

  // returns false if date is before today
  // purely M/D/Y, time is irrelevant
  const isDateValid = (date) => {
    var today = new Date();
    var dateCopy = new Date(date);
    today.setHours(0,0,0,0);
    dateCopy.setHours(0,0,0,0);
    return (dateCopy >= today);
  }

  // adds error messages and returns whether all input is valid
  const validateUserInputs = () => {
    var validInputs = true;
    // empty name
    if(eventDetails.Name == ""){
      setNameError("Event Name must not be empty.");
      validInputs = false;
    }else{
      setNameError(""); // change back to "" if there was error before
    }
    // if date is before today
    if(!isDateValid(eventDetails.Date)){
      setDateError("Event Date must be in future.");
      validInputs = false;
    }else{
      setDateError("");
    }
    // if date is valid but time before current time
    if(isDateValid(eventDetails.Date) && eventDetails.Date < (new Date())){
      setTimeError("Event Time must be in future.");
      validInputs = false;
    }else{
        setTimeError("");
    }
    return validInputs;
  }

  const handleSubmit = () => {
    // validate
    var isValidInput = validateUserInputs();
    // Tell parent (index) that we're ready to render Clock
    // send event details to parent
    if (isValidInput) {
        props.onStartClock(eventDetails);
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Countdown Timer</h1>
      <form>
        {/* Ternary for if name has an error message from validation */}
        {nameError == "" ? 
        <TextField style={{margin:'30px'}} label="Event Name" name="Name" variant="standard" onChange={handleNameChange}/>
        :
        <TextField style={{margin:'30px'}} error helperText={nameError} label="Event Name" name="Name" variant="standard" onChange={handleNameChange}/>
        }
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* Ternary for if date has an error message from validation */}
          {dateError == "" ?
          <KeyboardDatePicker
          style={{margin:'30px'}}
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
          }}/> :
          <KeyboardDatePicker
          style={{margin:'30px'}}
          error
          helperText={dateError}
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
          }}/>}
          {timeError == "" ?
          <KeyboardTimePicker
          style={{margin:'30px'}}
          margin="normal"
          id="time-picker"
          label="Event Time (Optional)"
          name="Time"
          value={eventDetails.Date}
          onChange={handleDateTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}/>
          :
          <KeyboardTimePicker
          style={{margin:'30px'}}
          error
          helperText={timeError}
          margin="normal"
          id="time-picker"
          label="Event Time (Optional)"
          name="Time"
          value={eventDetails.Date}
          onChange={handleDateTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}/>
          }
        </MuiPickersUtilsProvider>
        <Button style={{margin:'30px', padding: '10px', minHeight: '75px'}} variant="contained" color="primary" onClick={handleSubmit}>
          Start Timer!
        </Button>
      </form>
    </div>
  )
}
