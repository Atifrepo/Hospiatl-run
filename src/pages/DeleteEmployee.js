import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AdminAppbar from '../AdminAppbar'
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
class DeleteEmployee extends Component {
  constructor() {
    super()
    this.state = {
      Details: {
        EmployeeID: '',
        Password: '',
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
  handleSubmit(){
    console.log('')
    var name=cookies.get('username')
    console.log('username',name)
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2 style={{ color: '#2699FB' }}>Add Vitals of Patient</h2>
        <AdminAppbar />
        <TextField

          label="Employee ID"
          value={this.state.EmployeeID}
          onChange={this.handleChange.bind(this, 'EmployeeID')}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <br></br>
        <TextField
          label="Enter admin Password"
          value={this.state.Password}
          onChange={this.handleChange.bind(this, 'Password')}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <br></br>
        <Button variant="contained" style={{ backgroundColor: 'red', width: 220 }} onClick={this.handleSubmit}><b>Delete</b></Button>
      </div>
    )
  }
}
DeleteEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteEmployee)