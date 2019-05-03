import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminAppBar from '../AdminAppbar'
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
class EditEmployee extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      EmployeeID: '',
      NewPassword: ''

    }
  }
  handleChange({ target }) {

    this.setState({
      [target.name]: target.value

    })

  }


  handleClick() {

    var editemployee = {
      username: this.state.EmployeeID,
      password: this.state.Password


    };
    var formBody = [];

    for (var property in editemployee) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(editemployee[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/updateuserpassword', {
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
          setTimeout(() => toastr.success(`User Password changed`), 300)
        }
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Error exist`), 300)


      }).catch(error => {
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
        <AdminAppBar />

        <TextField
          label="Enter Employee ID"
          name="EmployeeID"
          value={this.state.EmployeeID}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        { /*
            // <TextField 

            //   label="Change Employee Name"
            //   value={this.state.NewName}
            //   onChange={this.handleChange.bind(this, 'NewName')}
            //   margin="normal"
            //   variant="outlined"
            //   className={classes.textField}
            // />
            
     */ }

        <br></br>
        <TextField

          label="Change Password"
          name="NewPassword"
          value={this.state.NewPassword}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        {/* <TextField 

              label="Confirm New Password"
              value={this.state.NewPassword1}
              onChange={this.handleChange.bind(this, 'NewPassword1')}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            /> */}
        {/* <br></br>
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
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Doctor'}>Doctor</MenuItem>
              <MenuItem value={'Nurse'}>Nurse</MenuItem>
              <MenuItem value={'Receptionist  '}>Receptionist</MenuItem>
            </Select>
          </FormControl> */}
        <br></br>
        <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} onClick={this.handleClick}><b style={{ color: '#fff' }}>Edit Employee</b></Button>
      </div>
    )
  }
}

EditEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditEmployee)
