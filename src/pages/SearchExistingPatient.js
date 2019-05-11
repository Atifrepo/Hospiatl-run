import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import RecAppbar from '../RecAppar'
import Cookies from 'universal-cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from "@material-ui/core/Paper";


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
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
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



class SearchExistingPatient extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {

      MR_No: '',
      Name: '',
      Fathername: '',
      Age: '',
      Gender: '',
      Phone_No: '',
      rows: []
    }


  }



  handleChange({ target }) {
    this.setState({
      [target.name]: target.value

    })

  }




  handleSearch = (event) => {
    event.preventDefault();
    var Search = {
      searchmrnumber: this.state.MR_No
    };


    var formBody = [];
    for (var property in Search) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(Search[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

   
    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/searchmrnumber', {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      },
      body: formBody

    })
      .then((resp) => {

        if (resp.status !== 200) {
          throw new Error("Not 200 response")
        }

        if (resp.ok) {
          var data = resp.json();
          return data;
        }
      })
      .then((result) => {
      
        this.setState({ Name: result[0].patientname, Fathername: result[0].fathername, Age: result[0].age, Gender: result[0].gender, Phone_No: result[0].telephone1 });
        this.setState({
          rows: result
        })

    

      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Patient Not found`), 300)
      })

  }






  render() {
    const { classes } = this.props;
    return (

      <div>
        <RecAppbar />

        <h1 style={{ color: '#2699FB', position: 'absolute' }}>Search existing patient</h1>
        <form onSubmit={this.handleSearch}>
        <TextField
          label="Search Patient"
          required={true}
          name="MR_No"
          value={this.state.MR_No}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} type="submit" ><b style={{color:'#fff'}}>Search</b></Button>
</form>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Patient Name</TableCell>
                <TableCell align="right">Patient Father Name</TableCell>
                <TableCell align="right">Patient Age</TableCell>
                <TableCell align="right">Patient Gender</TableCell>
                <TableCell align="right">Patient Mobile Number 1</TableCell>
                <TableCell align="right">Patient Mobile Number 2</TableCell>
                <TableCell align="right">Patient MR Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => (
                <TableRow >
                  <TableCell component="th" scope="row">
                    {row.patientname}
                  </TableCell>
                  {/* <TableCell align="right">{row.patientname}</TableCell> */}
                  <TableCell align="right">{row.fathername}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.telephone1}</TableCell>
                  <TableCell align="right">{row.telephone2}</TableCell>
                  <TableCell align="right">{row.mr_no}</TableCell>

                  <TableCell>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


        </Paper>
      </div>
    )
  }
}
SearchExistingPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchExistingPatient)