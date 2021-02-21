import React, { useState } from "react";
import EventInput from "./EventInput"
import Clock from "./Clock"
import styles from '../styles/Home.module.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import Head from 'next/head';

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
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
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
    </div>
  )
}
