import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import RecAppbar from '../RecAppar'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies=new Cookies();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit   ,
    marginRight: theme.spacing.unit ,
    
   
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '40',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class RegisterPatient extends Component {
  constructor() {
    super()
    this.state = {
      Register: {
        Name: '',
        FatherName: '',
        Age: '',
        Gender: '',
        Telephone1: '',
        Telephone2: '',
        labelWidth:0,
        name:'',
      },
      MR_No: '',
    }
    // console.log(cookies.get('token'));

  }
  handleClick() {
    var Register= {
      patientname: this.state.Register.Name,
      patientfathername: this.state.Register.Name2,
      age: this.state.Register.Age,
      gender:this.state.Register.Gender,
      telephone1:this.state.Register.Telephone1,
      telephone2:this.state.Register.Telephone2,
      mrnumber:this.state.MR_No
    };
    var formBody = [];
    console.log("Register values",Register);
for (var property in Register) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(Register[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}

formBody = formBody.join("&");

 console.log("Form Body",formBody);
 var Authtoken= cookies.get('token')
 var finalAuthtoken = 'Bearer '+Authtoken

 fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/addpatient',{
   method:'POST',
   withCredentials: true,
   
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization': finalAuthtoken
  
  },
   body: formBody

 }).then(function(resp){
     if(resp.ok){
     console.log("User added");
     }
   })  

    console.log('handle click login')
    console.log('user', this.state.Register)
  
  }
  handleChange(changeValue, event) {
    this.state.Register[changeValue] = event.target.value;
    this.setState = ({
      Register: this.state.Register,
      // password:this.state.password
    })
    console.log('Register', this.state.Register)
 }




 MR_No(){

   var self = this;
  axios({
    method:'get',
    url:'http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/createmrnumber',

  })
  .then(function(json) {
    var data = json;
    console.log(json.data);
     var mr=json.data
    console.log(mr);

 self.setState({
   MR_No:mr
 })

 console.log("MR Number",self.state.MR_No);
  
    }).catch(error=>{
console.log(error)
    })

  
 }

  render() {
    const { classes } = this.props;
    return (
     <div >
      
      <RecAppbar/>   
          <h2 style={{color:'#2699FB'}}>Register Patient</h2>
    
          <TextField
              label="Name"
              value={this.state.Name}
              onChange={this.handleChange.bind(this, 'Name')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            
       

       <TextField 
           label="Husband/Father Name"
           value={this.state.Name2}
           onChange={this.handleChange.bind(this, 'Name2')}
           margin="normal"
           variant="outlined"
           className={classes.textField}
/>
<br></br>
              <TextField
              label="Age"
              value={this.state.Age}
              onChange={this.handleChange.bind(this, 'Age')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            
            <h1>{this.state.MR_No}</h1>
                x 
{/*        
           <TextField
               label="MR_No"
               value={this.state.MR_No}
               onChange={this.handleChange.bind(this, 'MR_No')}
               margin="normal"
               variant="outlined"
               className={classes.textField}
             />  */}
            
    <br></br>   
          <TextField
              label="Telephone#1"
              value={this.state.Telephone1}
              onChange={this.handleChange.bind(this, 'Telephone1')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            
            
          <TextField
              label="Telephone#2"
              value={this.state.Telephone2}
              onChange={this.handleChange.bind(this, 'Telephone2')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            
    <br></br>
    <br></br>
    <div>
    <FormControl variant="outlined" className={classes.TextField}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
          </InputLabel>
        
            <Select style={{width:250,marginRight:"100%",paddingLeft:'50'}}
            
              value={this.state.Gender}
              onChange={this.handleChange.bind(this,'Gender')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  // name={this.state.Gender}
                  id="outlined-age-simple"
                  value={this.state.Gender}
                />

             }
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
              
            </Select>

            
          </FormControl>
          </div>
          <br></br>
    
        <Button variant="contained" style={{ backgroundColor: '#2699FB',position:'relative' }} onClick={(event) => this.handleClick(event)}><b>Register   Patient</b></Button>
        <Button variant="contained" style={{ backgroundColor: '#2699FB',position:'relative' }} onClick={(event) => this.MR_No(event)}><b>Generate MR_No</b></Button>
    
    
     
      
  
      </div>
   
     
    )
  }
}
RegisterPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RegisterPatient)