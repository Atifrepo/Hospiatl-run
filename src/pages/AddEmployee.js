import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import AdminAppbar from '../AdminAppbar';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,


  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
class AddEmployee extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        EmployeeID: '',
        Password: '',
        Type: '',
    

    }
  }
  handleChange({ target }) {

    this.setState({
      [target.name]: target.value

    })
    console.log('Register', this.state);
  }

 handleSubmit(){

console.log("STate",this.state);
var addemployee = {
      fullname: this.state.EmployeeID,
      password: this.state.Password,
      role: this.state.Type
      
          };
    var formBody = [];
   
    for (var property in addemployee) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(addemployee[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("Form Body", formBody);
    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/createuser', {
      method: 'POST',
      withCredentials: true,

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      },
      body: formBody

    })
    .then((resp) => {
      if (resp.ok) {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 3000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.success(`User Added`), 300)
      }
 toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`User not added . Maybe user already exist`), 300)
      

    }).catch(error=> {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Error in calling api`), 300)
      })


 }




  render() {
    const { classes } = this.props;
    return (

      <div>
        <h2 style={{ color: '#2699FB' }}>Add Employee</h2>
        <AdminAppbar />
        <form>
          <TextField

            label="Enter Employee Name"
            name="EmployeeID"
            value={this.state.EmployeeID}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
          <br></br>
          <TextField

            label="Set Password"
            name="Password"
            value={this.state.Password}
            onChange={this.handleChange}
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
            <Select style={{ width: 120, paddingLeft: 100 }}
              name="Type"
              value={this.state.Type}
              onChange={this.handleChange}
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
              <MenuItem value={'Receptionist'}>Receptionist</MenuItem>
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          <Button variant="contained" style={{ backgroundColor: '#2699FB', width: 220 }} onClick={this.handleSubmit}><b>Add User</b></Button>
        </form>


      </div>
    )
  }
}
AddEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddEmployee)