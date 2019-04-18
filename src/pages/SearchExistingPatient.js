import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuAppBar from '../Appbar'
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit *15  ,
      marginRight: theme.spacing.unit*10,
      marginTop:theme.spacing.unit*4,
      width:'30%'
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });
export default class SearchExistingPatient extends Component{
    constructor(){
        super()
    this.state={
        MR_No:'',
        Phone_No:'',
    }
    }
    render(){
        const { classes } = this.props;
        return(

<div>
<MenuAppBar/>

            <h1 style={{color:'#2699FB',position:'absolute'}}>Search existing patient</h1>
     
     <p>Search</p>
     </div>
            )
    }
}