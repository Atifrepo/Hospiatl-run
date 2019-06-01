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


  handleClick=(event) => {
   event.preventDefault();
    var editemployee = {
      username: this.state.EmployeeID,
      password: this.state.NewPassword


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
            positionClass: 'toast-bottom-left',
            hideDuration: 300000,
            timeOut: 100
          }
          toastr.clear()
          setTimeout(() => toastr.success(`User Password changed`), 300)
        }
        else {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Unable to update `), 300)
}

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
        <form onSubmit={this.handleClick}>
        <TextField
          label="Enter Employee Name"
          name="EmployeeID"
          required={true}
          value={this.state.EmployeeID}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
       

        <br></br>
        <TextField

          label="Change Password"
          name="NewPassword"
          required={true}
          value={this.state.NewPassword}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
       
        <br></br>
        <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} type="submit"><b style={{ color: '#fff' }}>Edit Employee</b></Button>
     </form>
      </div>
    )
  }
}

EditEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditEmployee)
