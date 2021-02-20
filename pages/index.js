import React, { useState } from "react";
import EventInput from "./EventInput"
import Clock from "./Clock"
import styles from '../styles/Home.module.css'
import GitHubIcon from '@material-ui/icons/GitHub';

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
    <div className={styles.container}>
      {isReadyForClock ?
        <Clock eventDetails={eventDetails} onClickBack={setNotReadyForClock}/>
        :
        <EventInput onStartClock={startClock} />
      }
      <h4 className={styles.myfooter}>
        <a target="_blank" href="https://github.com/ethan-massey">created by Ethan Massey ---> <GitHubIcon />
        </a>
      </h4>
    </div>
  )
}
