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

export default function EventInput(props) {
  const [eventDetails, setEventDetails] = useState({Name: 0, Date: TenDaysFromNow()})
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");

  // for event name input
  const handleNameChange = (event) => {
    setEventDetails({...eventDetails, Name: event.target.value});
  }

  // for date or time input
  const handleDateTimeChange = (date) => {
    setEventDetails({...eventDetails, Date: date});
  }

  // adds error messages and returns whether all input is valid
  const validateUserInputs = () => {
    // name
    if(eventDetails.Name == ""){
      setNameError("Event Name must not be empty.");
      return false;
    }else{
      setNameError(""); // change back to "" if there was error before
    }
    // date & time
    var today = new Date();
    if(eventDetails.Date <= today){
      setDateError("Event Date must be in future.");
      return false;
    }else{
      setDateError(""); // change back to "" if there was error before
    }
    return true;
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
      <h4>Enter event details below.</h4>
      <form>
        {/* Ternary for if name has an error message from validation */}
        {nameError == "" ? 
        <TextField label="Event Name" name="Name" variant="outlined" onChange={handleNameChange}/>
        :
        <TextField error helperText={nameError} label="Event Name" name="Name" variant="outlined" onChange={handleNameChange}/>
        }
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* Ternary for if date has an error message from validation */}
          {dateError == "" ?
          <KeyboardDatePicker
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
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Event Time (Optional)"
            name="Time"
            value={eventDetails.Date}
            onChange={handleDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
          }}/>
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Start Timer!
        </Button>
      </form>
    </div>
  )
}
