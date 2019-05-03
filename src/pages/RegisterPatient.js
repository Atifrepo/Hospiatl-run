import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import RecAppbar from '../RecAppar'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class RegisterPatient extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.MRNo = this.MRNo.bind(this);


    this.state = {

      Name: '',
      FatherName: '',
      Age: '',
      Gender: '',
      Telephone1: '',
      Telephone2: '',
      labelWidth: 0,
      MR_No: '',
    }

  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }



  handleClick() {

    var Register = {
      patientname: this.state.Name,
      patientfathername: this.state.FatherName,
      age: this.state.Age,
      gender: this.state.Gender,
      telephone1: this.state.Telephone1,
      telephone2: this.state.Telephone2,
      mrnumber: this.state.MR_No
    };


    var formBody = [];
   


    for (var property in Register) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(Register[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/addpatient', {
      method: 'POST',
      withCredentials: true,

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      },
      body: formBody

    })
      .then(function (resp) {
        if (resp.ok) {
          toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 3000,
            timeOut: 100
          }
          toastr.clear()
          setTimeout(() => toastr.success(`Patient registered`), 300)
        }

      }).catch(error=> {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`username or password is incorrect`), 300)
      })


this.setState({
  Name: '',
  FatherName: '',
  Age: '',
  Gender: '',
  Telephone1: '',
  Telephone2: '',
  MR_No: '',
})

  }


  handleChange({ target }) {

    this.setState({
      [target.name]: target.value
    })
   
  }




  MRNo() {


    axios({
      method: 'get',
      url: 'http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/createmrnumber',

    })
      .then((json) => {
        var data = json;
        var mr = json.data
        this.setState({
          MR_No: mr
        })

      })
      .catch(error => {
        
      })


  }

  render() {
    const { classes } = this.props;

    return (
      <div >

        <RecAppbar />
        <h2 style={{ color: '#2699FB' }}>Register Patient</h2>
        <div>
          <TextField
            disabled
            // id="outlined-disabled"
            // label={this.state.MR_No}
            name="MR_No"
            value={this.state.MR_No}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            style={{ backgroundColor: '#fff' }}
          />
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} onClick={this.MRNo}><b style={{color:'#fff'}}>Generate MR_No</b></Button>
        </div>
        <br></br>
        <TextField
          label="Name"
          name="Name"
          value={this.state.Name}
          required
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />



        <TextField
          label="Husband/Father Name"
          required
          name="FatherName"
          value={this.state.FatherName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />

        <br></br>
        <TextField
          label="Age"
          required
          name="Age"
          value={this.state.Age}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />

        <TextField
          label="Telephone#1"
          required
          name="Telephone1"
          value={this.state.Telephone1}

          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />

        <br></br>
        <TextField
          label="Telephone#2"
          required
          name="Telephone2"
          value={this.state.Telephone2}

          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />


        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ marginTop: '7%' }}
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            Gender
          </InputLabel>

          <Select style={{ width: 222, marginRight: "100%", marginTop: '7%' }}
            required
            name="Gender"
            value={this.state.Gender}
            onChange={this.handleChange}

            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name='name'
                id="outlined-age-simple"
              // value={this.state.Gender}
              />

            }
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>

          </Select>


        </FormControl>

        <br></br>

        <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} onClick={this.handleClick}><b style={{color:'#fff'}} >Register   Patient</b></Button>






      </div>


    )
  }
}



RegisterPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(RegisterPatient)