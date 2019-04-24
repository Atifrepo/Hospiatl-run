import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NurseAppbar from '../NurseAppbar'
import './addvitals.css'
import Cookies from 'universal-cookie';
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
const cookies = new Cookies();

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // marginTop:theme.spacing.unit*4,
  },
  dense: {
    // width:'80%'
    marginTop: 16,
  },

  menu: {
    width: 200,
  },
  textField1: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 9,

  }

});

class AddVitals extends Component {

  constructor() {
    super()
    this.state = {
      Vitals: {
        MR_No: '',
        Height: '',
        Weight: '',
        BP_lower: '',
        BP_Upper: '',
        Pulse: '',
        Temprature: '',
        PO2: '',
        Allergies: '',
        DateTime: '',
        rolecookies: '',
        Allergy: '',
      }
    }

  }
  // componentDidMount() {
  //   var rolecookis = cookies.get('roles')
  //   console.log('hi', rolecookis)
  //   this.setState({
  //     rolecookies: rolecookis
  //   })
  // }
  patientvital() {

    var Vitals = {
      heights: this.state.Vitals.Height,
      weight: this.state.Vitals.weight,
      bloodpressure: this.state.Vitals.BP_Upper,
      pulse: this.state.Vitals.Pulse,
      temperature: this.state.Vitals.Temprature,
      po2: this.state.Vitals.PO2,
      datetimes: this.state.Vitals.DateTime,
      allergiid: this.state.Vitals.Allergy,
      patientid: '5',
    };
    var formBody = [];
    console.log("vitals values", Vitals);
    for (var property in Vitals) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(Vitals[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("Form Body", formBody);
    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/addpatientvitals', {
      method: 'POST',
      withCredentials: true,

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      },
      body: formBody

    }).then(function (resp) {
      if (resp.ok) {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 3000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.success(`Patient Vitals Added`), 300)
      }
    })

    console.log('handle click login')
    console.log('user', this.state.Vitals)

    console.log("Hello");

  }

  GetAllergy() {

  }

  handleChange(changeValue, event) {
    this.state.Vitals[changeValue] = event.target.value;
    this.setState = ({
      Register: this.state.Vitals,
      // password:this.state.password
    })
    console.log('Register', this.state.Vitals)
  }


  Search() {
    console.log('searching')
  }

  render() {
    const { classes } = this.props;

    return (

      <div >

        <div>


          <h2 style={{ color: '#2699FB' }}>Add Vitals of Patient</h2>
          <NurseAppbar />

          <div>
            <TextField
              label="Enter MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} onClick={(event) => this.Search(event)}><b>Search</b></Button>
          </div>
          <br></br>
          <TextField
            label="Height"
            value={this.state.Height}
            onChange={this.handleChange.bind(this, 'Height')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="Weight"
            value={this.state.weight}
            onChange={this.handleChange.bind(this, 'weight')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="BP(mmHg)"
            value={this.state.BP_Upper}
            onChange={this.handleChange.bind(this, 'BP_Upper')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Pulse(bpm)"
            value={this.state.Pulse}
            onChange={this.handleChange.bind(this, 'Pulse')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="Tempreture"
            value={this.state.Temprature}
            onChange={this.handleChange.bind(this, 'Temprature')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="PO2"
            value={this.state.PO2}
            onChange={this.handleChange.bind(this, 'PO2')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <br></br>
          <TextField style={{ width: '15%', paddingTop: '1%' }}
            id="date"
            variant="outlined"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />        <TextField
            label="Allergy"
            value={this.state.PO2}
            onChange={this.handleChange.bind(this, 'PO2')}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>
          <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} onClick={(event) => this.patientvital(event)}><b>Add Vitals</b></Button>

        </div>

      </div>


    )
  }
}
AddVitals.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddVitals)