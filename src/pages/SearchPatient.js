import React, { Component } from 'react';
import DoctorAppbar from '../DoctorAppbar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button'
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit   ,
      marginRight: theme.spacing.unit ,
      
     
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: '40',
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
 class SearchPatient extends Component{
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
                <DoctorAppbar/>
            <h1 style={{color:'#2699FB',position:'absolute'}}>Search patient</h1>
            
            </div>
            )
    }
}
SearchPatient.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(SearchPatient)