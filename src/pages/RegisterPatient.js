import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

const cookies=new Cookies();

const styles  = ({
  root: {
    flexGrow: 0,
  },
  paper: {
    padding:0,
    textAlign: 'center',
    color: '#212121',
  },
});
export default class RegisterPatient extends Component {
  constructor() {
    super()
    this.state = {
      Register: {
        Name: '',
        Name2: '',
        Age: '',
        Gender: '',
        MR_No: '',
        Telephone1: '',
        Telephone2: '',
      }
    }
    console.log(cookies.get('token'));

  }
  handleClick() {

    console.log('handle click login')
    console.log('user', this.state.Register)
    this.props.history.push('/AddVitals')
  }
  handleChange(changeValue, event) {
    this.state.Register[changeValue] = event.target.value;
    this.setState = ({
      Register: this.state.Register,
      // password:this.state.password
    })
    console.log('Register', this.state.Register)
Cookies.get()

  }

  render() {
    return (
     <div>
      
          <Grid style={{padding:44}} item xs={24}>
          <h2 style={{color:'#2699FB'}}>Register Patient</h2>
  </Grid>
          <Grid style={styles.paper} container spacing={24} >
        <Grid  item xs={8} sm={5}>
      
          <TextField
              label="Name"
              value={this.state.Name}
              onChange={this.handleChange.bind(this, 'Name')}
              margin="normal"
              variant="outlined"
            />
            
        </Grid>
        <Grid  item xs={8} sm={5} >
       

       <TextField 
           label="Husband/Father Name"
           value={this.state.Name2}
           onChange={this.handleChange.bind(this, 'Name2')}
           margin="normal"
           variant="outlined"
         />
         

     </Grid>
        <Grid item xs={8} sm={5}>
      
          <TextField
              label="Age"
              value={this.state.Age}
              onChange={this.handleChange.bind(this, 'Age')}
              margin="normal"
              variant="outlined"
            />
            
        </Grid>
        <Grid item xs={8} sm={5}>
            <h4>Gender</h4>
          <div className='radioButton' onChange={this.handleChange.bind(this, 'Gender')} >
              <input type='radio' value='Male' name='user' /> Male
  <input type='radio' value='Female' name='user' /> Female
        </div>
        </Grid>

        <Grid item xs={8} sm={5}>
       
      
          <TextField
              label="MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
            />
            
        </Grid>
        <Grid item xs={8} sm={5}>
       
          <TextField
              label="Telephone#1"
              value={this.state.Telephone1}
              onChange={this.handleChange.bind(this, 'Telephone1')}
              margin="normal"
              variant="outlined"
            />
            
        </Grid>
        <Grid item xs={8} sm={5}>
       
          <TextField
              label="Telephone#2"
              value={this.state.Telephone2}
              onChange={this.handleChange.bind(this, 'Telephone2')}
              margin="normal"
              variant="outlined"
            />
            
        </Grid>
       
        <Grid item xs={8} sm={5}>
        <Button variant="contained" style={{ backgroundColor: '#2699FB',position:'absulute' }} onClick={(event) => this.handleClick(event)}><b>Register   Patient</b></Button>
        </Grid>
      </Grid>
     
      
  
      </div>
   
     
    )
  }
}