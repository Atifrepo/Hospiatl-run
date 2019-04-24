import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NurseAppbar from '../NurseAppbar'
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
    this.handleChange = this.handleChange.bind(this);
    this.patientvital = this.patientvital.bind(this);
    this.GetAllergy = this.GetAllergy.bind(this);
    this.Search = this.Search.bind(this);

    this.state = {

      MR_No: '',
      Height: '',
      Weight: '',
      // BP_lower: '',
      // BP_Upper: '',
      BP: '',
      Pulse: '',
      Temperature: '',
      PO2: '',
      Allergies: '',
      DateTime: '',
      rolecookies: '',
      Allergy: '',
      PatientName: '',
      PatientFatherName: '',
      Age: '',
      patientid: '',
      labelWidth: 0,

    }

  }


  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  // componentDidMount() {
  //   var rolecookis = cookies.get('roles')
  //   console.log('hi', rolecookis)
  //   this.setState({
  //     rolecookies: rolecookis
  //   })
  // }


  handleChange({ target }) {

    this.setState({
      [target.name]: target.value

    })
    console.log('Register', this.state.Vitals)
  }



  Search() {

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
        this.setState({ patientid: result[0].patientid, PatientName: result[0].patientname, PatientFatherName: result[0].fathername, Age: result[0].age });
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




  patientvital() {

    var Vitals = {
      heights: this.state.Height,
      weight: this.state.weight,
      bloodpressure: this.state.BP,
      pulse: this.state.Pulse,
      temperature: this.state.Temperature,
      po2: this.state.PO2,
      datetimes: this.state.DateTime,
      allergiid: this.state.Allergy,
      patientid: this.state.patientid,
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

    }).then((resp) => {
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


  }

  GetAllergy() {

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
              name="MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} onClick={this.Search}><b>Search</b></Button>
          </div>
          <br></br>
          <TextField
            label="Height"
            name="Height"
            value={this.state.Height}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="Weight"
            name="weight"
            value={this.state.weight}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="BP(mmHg)"
            name="BP"
            value={this.state.BP}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Pulse(bpm)"
            name="Pulse"
            value={this.state.Pulse}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="Temperature"
            name="Temperature"
            value={this.state.Temperature}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="PO2"
            name="PO2"
            value={this.state.PO2}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <br></br>
          <TextField style={{ width: '15%', paddingTop: '1%' }}
            id="date"
            variant="outlined"
            label="Date"
            type="date"
            name="DateTime"
            value={this.state.DateTime}
            onChange={this.handleChange}
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />   <FormControl variant="outlined" className={styles.formControl}>
            <InputLabel style={{ marginTop: '7%' }}
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
        </InputLabel>

            <Select style={{ width: 220, marginTop: '7%' }}
              name="Allergy"
              value={this.state.Allergy}
              onChange={this.handleChange}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="Allergy"
                  id="outlined-age-simple"
                // value={this.state.role}
                />

              }
            >
              <MenuItem value={'1'}>Allergy1</MenuItem>
              <MenuItem value={'2'}>Allergy2</MenuItem>
              <MenuItem value={'3'}>Allergy3</MenuItem>
              <MenuItem value={'4'}>Allergy4</MenuItem>
            </Select>


          </FormControl>
          <br></br>
          <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} onClick={this.patientvital}><b>Add Vitals</b></Button>

        </div>

      </div>


    )
  }
}
AddVitals.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddVitals)