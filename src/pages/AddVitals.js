import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
export default class AddVitals extends Component{
    constructor(){
        super()
this.state={
    MR_No:'',
    Height:'',
    Weight:'',
    BP_lower:'',
    BP_Upper:'',
    Pulse:'',
    Temprature:'',
    PO2:'',
    Allergies:'',
}

    }
render(){
    return(
        <div>
        <h2 style={{color:'#2699FB',position:'absolute'}}>Add vitals of patient</h2>
        <form>
            <TextField style={{color:'red'}}
           label="Enter MR-No"
           margin="normal"
          variant="outlined"    
    /> 
        </form>
        </div>
    )
}
}