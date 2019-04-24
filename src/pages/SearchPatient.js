import React, { Component } from 'react';
import DoctorAppbar from '../DoctorAppbar'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

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
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '40',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
class SearchPatient extends Component {
  constructor() {
    super()
    this.state = {

      MR_No: '',
      Phone_No: '',
    }
  }
  handleChange() {
    console.log('search')
  }
  render() {
    const { classes } = this.props;
    return (

      <div>
        <DoctorAppbar />
        <h2 style={{ color: '#2699FB', position: 'absolute' }}>Search patient</h2>
        <TextField
          label="Search Patient"
          value={this.state.MR_No}
          onChange={this.handleChange.bind(this, 'MR_No')}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />


      </div>
    )
  }
}
SearchPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchPatient)