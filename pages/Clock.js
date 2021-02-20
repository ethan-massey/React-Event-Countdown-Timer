import React, {useState} from "react"
import Button from '@material-ui/core/Button';

export default function Clock(props){

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={()=>{props.onClickBack()}}>BACK</Button>
        </div>
    )
}