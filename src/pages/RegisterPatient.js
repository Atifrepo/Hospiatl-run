import React, { Component } from 'react';
import {Row,Col} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class RegisterPatient extends Component{
    constructor(){
        super()
        this.state={
            Name:'',
            Name2:'',
            Age:'',
            Gender:'',
            MR_No:'',
            Telephone1:'',
            Telephone2:'',
        }
    
    }
    handleChange(){
        console.log('handle change Register Patient')
    }
render(){
    return(
        <div>
            <h2 style={{color:'#2699FB',position:'absolute'}}>Register new patient</h2>
            <form>
            <br></br>
<Row>
<Col>
<TextField

label="Name"
value={this.state.Name}
onChange={this.handleChange('Name')}
margin="normal"
variant="outlined"
/>
</Col>
<Col>
<br></br>
<TextField

label="Husband/Father Name'"
value={this.state.Name2}
onChange={this.handleChange('Name2')}
margin="normal"
variant="outlined"
/>
<br></br>
</Col>
</Row>
<TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
<br></br>
<br></br>
<FormControl component="fieldset" >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender2"
            // className={classes.group}
            value={this.state.Age}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
              labelPlacement="start"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
              labelPlacement="start"
            />
            <FormControlLabel
              value="other"
              control={<Radio color="primary" />}
              label="Other"
              labelPlacement="start"
            />
           
          </RadioGroup>
         
        </FormControl>
<br></br>
<TextField
label="MR No."
value={this.state.MR_No}
onChange={this.handleChange('MR_No')}
margin="normal"
variant="outlined"
/>
<br></br>
<TextField
label="Telephone#1"
value={this.state.Telephone}
onChange={this.handleChange('Telephone')}
margin="normal"
variant="outlined"
/>
<br></br>
<TextField
label="Telephone#2"
value={this.state.Telephone2}
onChange={this.handleChange('Telephone2')}
margin="normal"
variant="outlined"
/>

            </form>
        </div>
    )
}
}