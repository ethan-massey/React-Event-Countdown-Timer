import React, {useState, useEffect} from "react"
import Button from '@material-ui/core/Button';
import Confetti from 'react-confetti'
import styles from '../styles/Home.module.css'

export default function Clock(props){
    const [difference, setDifference] = useState(props.eventDetails.Date - (new Date()));
    
    const getReadableTimeFromMilliseconds = (milli) => {
        var days = Math.floor(milli/1000/60/60/24);
        if(days > 0){
            milli -= days*1000*60*60*24
        }
        var hours = Math.floor(milli/1000/60/60);
        if(hours > 0){
            milli -= hours*1000*60*60
        }
        var minutes = Math.floor(milli/1000/60);
        if(minutes > 0){
            milli -= minutes*1000*60
        }
        var seconds = Math.floor(milli/1000);
        return (
            <div>
                <h1>{days} Days, and</h1>
                <h1>{("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}</h1>
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
        <div>
            {difference < 0 ?
            <div>
                <Confetti/>
                <h1>00:00:00</h1>
            </div>
            :
            getReadableTimeFromMilliseconds(difference)
            }
            <h1>until {props.eventDetails.Name}</h1>
            <Button variant="contained" color="secondary" onClick={()=>{props.onClickBack()}}>BACK</Button>
        </div>
    )
}
