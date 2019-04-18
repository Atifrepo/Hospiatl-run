import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuAppBar from '../Appbar'



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit *15  ,
    marginRight: theme.spacing.unit*10,
    marginTop:theme.spacing.unit*4,
    width:'30%'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
class AddEmployee extends Component{
constructor(){
    super()
this.state={
    Details:{
Name:'',
EmployeeID:'',
Password:'',
Password2:'',
Type:'',
}

}
}
handleChange(changeValue, event) {
    this.state.Details[changeValue] = event.target.value;
    this.setState = ({
      Details: this.state.Details,
      // password:this.state.password
    })
    console.log('login', this.state.Details)
  }

render(){
  const { classes } = this.props;
    return(
      
        <div>
          <h2 style={{color:'#2699FB'}}>Add Employee</h2>
          <MenuAppBar/>
<form>
<TextField 
              label="Enter MR_No"
              value={this.state.MR_No}
              onChange={this.handleChange.bind(this, 'MR_No')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField 

              label="Employee ID"
              value={this.state.EmployeeID}
              onChange={this.handleChange.bind(this, 'EmployeeID')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField 

              label="Set Password"
              value={this.state.Password}
              onChange={this.handleChange.bind(this, 'Password')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
/>
            <TextField 

              label="Confirm Passowrd"
              value={this.state.Password2}
              onChange={this.handleChange.bind(this, 'Password2')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <br></br>
            <br></br>
          <FormControl variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
          </InputLabel>
            <Select style={{width:500,marginRight:"100%",paddingLeft:'50'}}
              value={this.state.type}
              onChange={this.handleChange.bind(this, 'type')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="type"
                  id="outlined-age-simple"
                />
              }
            >
              {/* <MenuItem value=""> */}
                {/* <em value={'Admin'}>Admin</em> */}
              {/* </MenuItem> */}
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Doctor'}>Doctor</MenuItem>
              <MenuItem value={'Nurse'}>Nurse</MenuItem>
              <MenuItem value={'Receptionist  '}>Receptionist</MenuItem>
            </Select>
          </FormControl>
          </form>  
        </div>
    )
}
}
AddEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddEmployee)