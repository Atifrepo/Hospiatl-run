import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import toastr from 'toastr'
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,


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
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {

      MR_No: '',
      Name: '',
      Fathername: '',
      Age: '',
    }


  }



  handleChange({ target }) {
    this.setState({
      [target.name]: target.value

    })
    console.log('Register', this.state.MR_No)
  }




  handleSearch() {

    var Search = {
      searchmrnumber: this.state.MR_No
    };


    var formBody = [];
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

    })
      .then((resp) => {

        if (resp.status !== 200) {
          throw new Error("Not 200 response")
        }

        if (resp.ok) {
          var data = resp.json();
          return data;
        }
      })
      .then((result) => {
        console.log("Response from server", result);
        this.setState({ Name: result[0].patientname, Fathername: result[0].fathername, Age: result[0].age });
        console.log("State after setting", this.state)
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.success(`Patient Not found`), 300)
      })

  }






  render() {
    const { classes } = this.props;
    return (

      <div>
        <RecAppbar />

        <h1 style={{ color: '#2699FB', position: 'absolute' }}>Search existing patient</h1>
        <TextField
          label="Search Patient"
          name="MR_No"
          value={this.state.MR_No}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <h6>{this.state.Name}</h6>
        <h6>{this.state.Fathername}</h6>
        <h6>{this.state.Age}</h6>
        <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} onClick={this.handleSearch}>Search</Button>
      </div>
    )
  }
}
SearchExistingPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchExistingPatient)