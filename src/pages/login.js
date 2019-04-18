import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import login from '../Assets/login.jpg'
import Axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Cookies from 'universal-cookie';
import { func } from 'prop-types';

const cookies=new Cookies();
const styles = theme => ({
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
    this.state = {
      Details: {
        labelWidth: 0,
        username: '',
        password: '',
        role: '',
        name: 'hai',
      }

    }
    
  }
  handleChange(changeValue, event) {
    this.state.Details[changeValue] = event.target.value;
    this.setState = ({
      Details: this.state.Details,
      // password:this.state.password
    })
    console.log('login', this.state.Details.role)
  }


  handleChanges = (event, index, value) => {
    
    
    this.setState({ selectedValue:this.state.Details.role  });

    
  };

handleSubmit=(event)=>{
  var details = {
    username: this.state.Details.username,
    password: this.state.Details.password,
    role: this.state.Details.role
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
   }).then(function(resp){
     if(resp.ok){
     return resp.json()
     }
   }).then(function(data){
     cookies.set('token', data.token, { path: '/' });
     console.log(cookies.get('token'));
     cookies.set('username', data.username, { path: '/' });
     console.log(cookies.get('username')); 
     cookies.set('roles', data.roles, { path: '/' });
     console.log(cookies.get('roles'));
     if(data.roles=='Receptionist'){
      window.location.href = '/register';
      console.log('login role',data.roles)
     }

     if(data.roles=='Nurse'){
      window.location.href = '/addvitals';
      console.log('login role',data.roles)
     }

    })
   
   
   .catch(function(error){
    console.log("Error");

   })
   

   
 
console.log('res',details)

}
  render() {
      

    return (
      <div>
      
        <form>

          <br></br>
<br></br>
<br></br>
<br></br>
          <TextField
            label="Employee ID"
            value={this.state.username}
            onChange={this.handleChange.bind(this, 'username')}
            margin="normal"
            variant="outlined"
          />
          <br></br>

          <TextField
            id="outlined-password-input"
            label="Password"

            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <br></br>
<br></br>

          <FormControl variant="outlined" className={styles.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
          </InputLabel>
        
            <Select style={{width:220}}
            
              value={this.state.Details.role}
              onChange={this.handleChange.bind(this,'role')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name={this.state.role}
                  id="outlined-age-simple"
                  value={this.state.role}
                />

             }
            >
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Doctor'}>Doctor</MenuItem>
              <MenuItem value={'Nurse'}>Nurse</MenuItem>
              <MenuItem value={'Receptionist'}>Receptionist</MenuItem>
            </Select>

            
          </FormControl>
          <br></br>
          <br></br>
          <Button variant="contained" style={{ backgroundColor: '#2699FB',width:220 }} onClick={(event) => this.handleSubmit (event)}><b>login</b></Button>
        </form>
      </div>
    )
  }
}