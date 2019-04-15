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
const styles =  ({
  root: {
    display: 'flex',
    flexWrap: 'wrap', 
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 2,
  },
})
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      Details: {
        labelWidth: 0,
        username: '',
        password: '',
        role: '',
      }

    }
  }

  handleClick() {
    console.log('handle click login')
    console.log('user', this.state.Details)
console.log('type',this.state.Details.type)
    if(this.state.Details.type === 'Nurse'){
    this.props.history.push('/AddVitals')
    console.log(this.state.Details.type)
  }
  if(this.state.Details.type === 'Admin'){
    this.props.history.push('/AddEmployee')
    console.log(this.state.Details.type)
  }
  if(this.state.Details.type === 'Receptionist'){
    this.props.history.push('/Register')
    console.log(this.state.Details.type)
  }
  if(this.state.Details.type === 'Doctor'){
    this.props.history.push('/AddVitals')
    console.log(this.state.Details.type)
  }
  
  
  
    
  }
    // this.props.history.push('/Register')
  

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
// handleSubmit=(e)=>{
//   e.preventDefault();
//   const url="http://primespecialistclinics.com:40001/loginuser"
//   const Details={
//     username:'Muhammad Obaid',
//     password:'admin',
//     role:'Admin',
//   }
// Axios.post(url,Details).then((res)=>{

// }).catch((e)=>{
//   console.log('errors')
// })
// }
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
formBody = formBody.join("&");

fetch('http://primespecialistclinics.com:40001/loginuser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: formBody
  
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
<div className={styles.root}></div>
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
          <Button variant="contained" style={{ backgroundColor: '#2699FB',width:220 }} onClick={(event) => this.handleClick (event)}><b>login</b></Button>
        </form>
      </div>
    )
  }
}