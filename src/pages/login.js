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
import classNames from 'classnames';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


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
  margin: {
    margin: theme.spacing.unit,
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
      required:true,
      showPassword: false,


    }

  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });

    var tokencookis=cookies.get('roles')
    console.log('token',tokencookis)
      if (tokencookis == 'Receptionist') {
        window.location.href = '/register';
      
      }
    
      if (tokencookis == 'Nurse') {
        console.log(this.state.cookierolevalue);
        window.location.href = '/addvitals';
            }
    
      if (tokencookis == 'Doctor') {
        window.location.href = '/SearchPatient';
      
      
    
    
    }
  }
  handleChange({ target }) {

    this.setState({
      [target.name]: target.value
    })
   
  }



  handleSubmit = (event) => {
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
    var token;
    var username;

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
      console.log(cookies.get('token'));
      cookies.set('username', data.username, { path: '/' });
      console.log(cookies.get('username'));
      cookies.set('roles', data.roles, { path: '/' });
      console.log(cookies.get('roles'));
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

handleClickShowPassword = () => {
  this.setState(state => ({ showPassword: !state.showPassword }));
};
  render() {

    const { classes } = this.props;

    return (
      <div>

        <form >

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <TextField

            name="username"
            label="Employee ID"
            value={this.state.username}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />
          <br></br>

          <TextField style={{width:'14.5%'}}
            name="password"
            id="outlined-password-input"
            label="Password"
            // type="password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            isRequired="true"
            onChange={this.handleChange}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br></br>
          <br></br>
     

          <FormControl variant="outlined" className={styles.formControl} required>
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
            <Button variant="contained" style={{ backgroundColor: '#2699FB', width: 220 }} onClick={this.handleSubmit}><b style={{ color: '#fff' }}>login</b></Button>
          </FormControl>
        </form>
      </div>
    )
  }
}