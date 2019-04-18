import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
export default class xSearchPatient extends Component{
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
            <h1 style={{color:'#2699FB',position:'absolute'}}>Search patient</h1>
            <p>Search</p>
            </div>
            )
    }
}