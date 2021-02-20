import React, { useState } from "react";
import EventInput from "./EventInput"
import Clock from "./Clock"

export default function App() {
  const [isReadyForClock, setIsReadyForClock] = useState(false);
  const [eventDetails, setEventDetails] = useState(0)

  const startClock = (detailsFromUser) => {
    setEventDetails(detailsFromUser);
    setIsReadyForClock(true);
  }

  const setNotReadyForClock = () => {
    setIsReadyForClock(false);
  }


  return (
    <div>
      <h1>Countdown Timer</h1>
      {isReadyForClock ?
        <Clock eventDetails={eventDetails} onClickBack={setNotReadyForClock}/>
        :
        <EventInput onStartClock={startClock} />
      }
    </div>
  )
}