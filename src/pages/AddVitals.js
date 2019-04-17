import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import './addvitals.css'
import Cookies from 'universal-cookie';
const cookies=new Cookies();


const styles = ({
  root: {
    flexGrow: 0,
  },
  paper: {
    padding: 40,
    textAlign: 'center',

    //   color: theme.palette.text.secondary,
  },
});


export default class AddVitals extends Component {

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
      rolecookies:''
      }
    }

  }
componentDidMount(){
  var rolecookis=cookies.get('roles')
console.log('hi',rolecookis)
 this.setState({
   rolecookies:rolecookis
 })
}  
  handleClick() {

    console.log('handle click login')
    console.log('user', this.state.Vitals)
    this.props.history.push('/AddVitals')
  }
  handleChange(changeValue, event) {
    this.state.Vitals[changeValue] = event.target.value;
    this.setState = ({
      Register: this.state.Vitals,
      // password:this.state.password
    })
    console.log('Register', this.state.Vitals)
  }

  render() {

  
    return (
      
<div >
 {this.state.rolecookies?
 <div> 
<Grid style={{padding:45}} item xs={12}>
         
        <h2>Add Vitals of Patient</h2>
        </Grid>
        <Grid style={styles.paper} container spacing={24}>
          <Grid item xs={4} sm={1}>

          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              label="Enter MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
            />

          </Grid>
          <Grid item xs={20} sm={8}>

          </Grid>

          <Grid item xs={10} sm={5}>
            <TextField
              label="Height"
              value={this.state.Height}
              onChange={this.handleChange.bind(this, 'Height')}
              variant="outlined"
              />
              
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Weight"
              value={this.state.Weight}
              onChange={this.handleChange.bind(this, 'Weight')}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} sm={5}>
            <TextField
              label="BP(mmHg)"
              value={this.state.BP_Upper}
              onChange={this.handleChange.bind(this, 'BP_Upper')}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              label="Pulse(bpm)"
              value={this.state.Pulse}
              onChange={this.handleChange.bind(this, 'Pulse')}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} sm={5}>
            <TextField
              label="Tempreture"
              value={this.state.Temprature}
              onChange={this.handleChange.bind(this, 'Temprature')}
              variant="outlined"
            />
          </Grid>
           <Grid item xs={6} sm={3}>
          <TextField
              label="PO2"
              value={this.state.PO2}
              onChange={this.handleChange.bind(this, 'PO2')}
              variant="outlined"
            />
          </Grid>
                  </Grid>
      
                  <Button variant="contained" style={{ backgroundColor: '#2699FB',position:'absulute' }} onClick={(event) => this.handleClick(event)}><b>Add Vitals</b></Button>
                  </div>
                  :
                  alert('login first')
                }
                  </div>
   
   )
  }
}
