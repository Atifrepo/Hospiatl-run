import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import RecAppbar from '../RecAppar'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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
 class SearchExistingPatient extends Component {
  constructor() {
    super()
    this.state ={
      Search:
      {
        MR_No: '',
        Phone_No: '',
      }
    } 
  }
     handleChange(changeValue, event) {
      this.state.Search[changeValue] = event.target.value;
      this.setState = ({
        Search: this.state.Search
        // password:this.state.password
      })
      console.log('Register', this.state.Search)
    }
  
handleSearch(){
  
  var Search = {
    searchmrnumber: this.state.Search.MR_No
  };
  var formBody = [];
  console.log("Register values", Search);
  for (var property in Search) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(Search[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");

  console.log("Form Body", formBody);
  var Authtoken = cookies.get('token')
  var finalAuthtoken = 'Bearer ' + Authtoken

  fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/searchmrnumber', {
    method: 'POST',
    withCredentials: true,

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': finalAuthtoken

    },
    body: formBody

  }).then(function (resp) {
    if (resp.ok) {
     var data = resp.json(); 
    console.log('search',data) 
    }
  })

  // console.log('handle click login') 
  // console.log('user', this.state.Register)

}
  render() {
    const { classes } = this.props;
    return (

      <div>
        <RecAppbar />

        <h1 style={{ color: '#2699FB', position: 'absolute' }}>Search existing patient</h1>
<TextField
              label="Search Patient"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
  <Button variant="outlined" style={{ backgroundColor: '#2699FB',marginTop:'2%' }} onClick={(event) => this.handleSearch(event)}>Search</Button>
      </div>
    )
  }
}
SearchExistingPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchExistingPatient)