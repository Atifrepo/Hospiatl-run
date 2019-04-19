import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NurseAppbar from '../NurseAppbar'
import './addvitals.css'
import Cookies from 'universal-cookie';
const cookies=new Cookies();

const styles = theme => ({
  
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit  ,
    marginRight: theme.spacing.unit,
    // marginTop:theme.spacing.unit*4,
    // width:'80%'
  },
  dense: {
    marginTop: 16,
  },
  
  menu: {
    width: 200,
  },
  textField1:{
    marginLeft: theme.spacing.unit  ,
    marginRight: theme.spacing.unit*9,
  
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
    const { classes } = this.props;
  
    return (
      
<div >
 
 <div> 

         
        <h2 style={{color:'#2699FB'}}>Add Vitals of Patient</h2>
          <NurseAppbar/>
          <form >
            <TextField 
              label="Enter MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              label="Height"
              value={this.state.Height}
              onChange={this.handleChange.bind(this, 'Height')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
              />
              <br></br>
                     <TextField
              label="Weight"
              value={this.state.Weight}
              onChange={this.handleChange.bind(this, 'Weight')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
         />
            <TextField
              label="BP(mmHg)"
              value={this.state.BP_Upper}
              onChange={this.handleChange.bind(this, 'BP_Upper')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
            />
            <br></br>
            <TextField
              label="Pulse(bpm)"
              value={this.state.Pulse}
              onChange={this.handleChange.bind(this, 'Pulse')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              label="Tempreture"
              value={this.state.Temprature}
              onChange={this.handleChange.bind(this, 'Temprature')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
            />
            <br></br>
          <TextField
              label="PO2"
              value={this.state.PO2}
              onChange={this.handleChange.bind(this, 'PO2')}
              variant="outlined"
              className={classes.textField}
              margin="normal"
          />
                </form>
                  </div>
                  
                  </div>
                
   
   )
  }
}
AddVitals.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddVitals)