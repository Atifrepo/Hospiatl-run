import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class SearchExistingPatient extends Component{
    constructor(){
        super()
    this.state={
        MR_No:'',
        Phone_No:'',
    }
    }
    render(){
        return(
            <div>
            <h1 style={{color:'#2699FB',position:'absolute'}}>Search existing patient</h1>
     
     <p>Search</p>
     </div>
            )
    }
}