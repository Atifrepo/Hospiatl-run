import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Cookies from 'universal-cookie';
import toastr from 'toastr'

const cookies = new Cookies();
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export default class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {

      labelWidth: 0,
      username: '',
      password: '',
      role: '',
      name: 'hai',


    }

  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }
  handleChange({ target }) {

    this.setState({
      [target.name]: target.value
    })
   
  }



  handleSubmit = (event) => {


     event.preventDefault();
     if(!this.state.role){
            toastr.options = {
              positionClass: 'toast-bottom-left',
              hideDuration: 300000,
              timeOut: 100
            }
            toastr.clear()
            setTimeout(() => toastr.error(`Please select role`), 300)
     }

   else {
   

             var details = {
                    username: this.state.username,
                    password: this.state.password,
                    role: this.state.role
               };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }

            formBody = formBody.join("&");

            fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/loginuser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: formBody
            }).then(function (resp) {
              if (resp.ok) {
                return resp.json()
              }
            }).then(function (data) {
              cookies.set('token', data.token, { path: '/' });
              cookies.set('username', data.username, { path: '/' });
              cookies.set('roles', data.roles, { path: '/' });
              if (data.roles == 'Receptionist') {
                window.location.href = '/register';
              
              }

              if (data.roles == 'Nurse') {
                window.location.href = '/addvitals';
                    }

              if (data.roles == 'Doctor') {
                window.location.href = '/SearchPatient';
              
              }



            })


              .catch(function (error) {
                toastr.options = {
                  positionClass: 'toast-bottom-left',
                  hideDuration: 300000,
                  timeOut: 100
                }
                toastr.clear()
                setTimeout(() => toastr.error(`username or password is incorrect`), 300)
              })



}

  }



  render() {


    return (
      <div>

        <form  onSubmit={this.handleSubmit}>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <TextField
            id="standard-required"
            required={true}
            name="username"
            label="Employee ID"
            value={this.state.username}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <br></br>

          <TextField
            name="password"
            required={true}
            id="outlined-password-input"
            label="Password"

            type="password"
            value={this.state.password}
           required  onChange={this.handleChange}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <br></br>
          <br></br>

          <FormControl variant="outlined" className={styles.formControl} >
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
          </InputLabel>

            <Select style={{ width: 220 }}

              name="role"
              required
              value={this.state.role}
              onChange={this.handleChange}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="name"
                  id="outlined-age-simple"
                // value={this.state.role}
                />

              }
            >

              <MenuItem value={'Doctor'}>Doctor</MenuItem>
              <MenuItem value={'Nurse'}>Nurse</MenuItem>
              <MenuItem value={'Receptionist'}>Receptionist</MenuItem>
            </Select>



            <br></br>
            <br></br>
            <Button variant="contained" style={{ backgroundColor: '#2699FB', width: 220 }} type="submit"><b style={{ color: '#fff' }}>login</b></Button>
          </FormControl>
        </form>
      </div>
    )
  }
}