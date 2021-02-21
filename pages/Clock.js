import React, {useState, useEffect} from "react"
import Button from '@material-ui/core/Button';
import Confetti from 'react-confetti'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Clock(props){
    const [difference, setDifference] = useState(props.eventDetails.Date - (new Date()));
    
    audio.play();
    const getReadableTimeFromMilliseconds = (milli) => {
        var days = Math.floor(milli/1000/60/60/24);
        if(days > 0){
            milli -= days*1000*60*60*24;
        }
        var hours = Math.floor(milli/1000/60/60);
        if(hours > 0){
            milli -= hours*1000*60*60;
        }
        var minutes = Math.floor(milli/1000/60);
        if(minutes > 0){
            milli -= minutes*1000*60;
        }
        var seconds = Math.floor(milli/1000);
        return (
            <div>
                <h1 style={{fontSize: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>{days} Days, and</h1>
                <h1 style={{fontSize: '10rem'}}>{("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}</h1>
            </div>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDifference(props.eventDetails.Date - (new Date()))
        }, 1000);
        return () => {clearInterval(interval)}
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {difference < 0 ?
            <div>
                <Confetti/>
                <div>
                    <h1 style={{fontSize: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>0 Days, and</h1>
                    <h1 className={styles.blink_me} style={{fontSize: '10rem', color: 'green'}}>00:00:00</h1>
                </div>
            </div>
            :
            getReadableTimeFromMilliseconds(difference)
            }
            <h1 style={{fontSize: '4rem'}} >until {props.eventDetails.Name}</h1>
            <Button variant="contained" color="secondary" onClick={()=>{props.onClickBack()}}>BACK</Button>
        </div>
    )
}
