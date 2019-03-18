import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import login from '../Assets/login.jpg'
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
     Details: {
      EmployeeID: '',
      password: '',
      type: '',
     }
      
    }
  }

  handleClick() {
//api here 
    console.log('handle click login')

    this.props.history.push('/Register')
  }

  handleChange(changeValue,event) {
    this.state.Details[changeValue]=event.target.value;
    this.setState=({
      Details:this.state.Details
    })
console.log('login',this.state.Details)
  }

  render() {
    return (
      <div>
<img style={{height:'500px',width:'1500px'}} src={require('../Assets/login.jpg')}/>
        <form>

          <br></br>
          
          <TextField
            label="Employee ID"
            value={this.state.EmployeeID}
            onChange={this.handleChange.bind(this,'name')}
            margin="normal"
            variant="outlined"
          />
          <br></br>

          <TextField
            id="outlined-password-input"
            label="Password"
        
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this,'name')}
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <br></br>



          <Button variant="contained" style={{ backgroundColor: '#2699FB' }} onClick={(event) => this.handleClick(event)}><b>login</b></Button>
        </form>
      </div>
    )
  }
}