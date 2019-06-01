import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Paper from '@material-ui/core/Paper';
import PropTypes, { func } from 'prop-types';
import DoctorAppbar from '../DoctorAppbar'

import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
const cookies = new Cookies();

const columns = ["MR No.", "Name", "Last Name", "Father/Husband Nama", "Age", "Gender", "Telehone#1", "Telephone#2"];


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class ViewAllPatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      search: '',
    }
    this.searchHandler = this.searchHandler.bind(this);

  }
  searchHandler(event) {
    this.setState({
      search: event.target.value.substr(0, 20)
    });
  }
  componentDidMount() {




    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/viewsearchpatient', {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      }

    })
      .then((result) => {
        console.log('re', result)

        var jsondata = result.json();
        return jsondata;

      }).
      then((data) => {
        console.log("data", data);
        this.setState({
          rows: data
        })
      })

      .catch((error) => {
        console.log("error")
      });


  }


  render() {
    const { classes } = this.props;
    
    return (
      <div>

        <DoctorAppbar />
        <Paper className={classes.root}>
          <MUIDataTable
            columns={columns}
            data={this.state.rows.map(row => {
              return [
                row.mr_no,
                row.patientname,
                row.patientlastname,
                row.fathername,
                row.age,
                row.gender,
                row.telephone1,
                row.telephone2


]

            })}
          />
         
        </Paper>
      </div>
    )
  }
}

ViewAllPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewAllPatient);
