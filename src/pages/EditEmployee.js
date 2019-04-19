import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MenuAppBar from '../NurseAppbar'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit   ,
    marginRight: theme.spacing.unit,
    
  
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
 class EditEmployee extends Component{
constructor(){
    super()
this.state={
    Details:{
        EmployeeID:'',
        NewName:'',
        NewPassword:'',
        NewPassword1:'',
        NewType:'',
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
          <MenuAppBar/>
        
            <TextField 
              label="Enter Employee ID"
              value={this.state.EmployeeID}
              onChange={this.handleChange.bind(this, 'EmployeeID')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField 

              label="Change Employee Name"
              value={this.state.NewName}
              onChange={this.handleChange.bind(this, 'NewName')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <br></br>
            <TextField

              label="Change Employee Password"
              value={this.state.NewPassword}
              onChange={this.handleChange.bind(this, 'NewPassword')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField 

              label="Confirm New Password"
              value={this.state.NewPassword1}
              onChange={this.handleChange.bind(this, 'NewPassword1')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
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
            <Select style={{width:250,marginRight:"100%",paddingLeft:'50'}}
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
        </div>
    )
}
}

EditEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditEmployee)
