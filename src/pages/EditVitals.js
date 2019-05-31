import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import DoctorAppBar from '../DoctorAppbar'
import Cookies from 'universal-cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const cookies = new Cookies();
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {

    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  // },



});






class SearchPatient extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.editVitals = this.editVitals.bind(this,index);


    this.state = {

      MR_No: '',
      Name: '',
      LName: '',
      Fathername: '',
      Age: '',
      multiline: '',
      note: '',
      patientid: '',
      rows: [],
      receivenote: []
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
      patientmrnumber: this.state.MR_No
    };
    this.setState({
      rows: []
    })


    var formBody = [];
    for (var property in Search) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(Search[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");


    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/getpatientdetails', {
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
        this.setState({
          Name: result[0].patientname,
          Fathername: result[0].fathername,
          Age: result[0].age,
          patientid: result[0].patientid
        });


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
  editVitals(rows) {
    for (let i = 0; i < rows.length; i++) {
      console.log(this.state.data[rows[i]])
  }
  }
render() {
    const { classes } = this.props;
    return (



      <div style={{ overflowX: "hidden" }}>
        <DoctorAppBar />
        <h2 style={{ color: '#2699FB', position: 'absolute' }}>Edit Vitals</h2>
        <form onSubmit={this.handleSearch}>
          <br></br>
          <br></br>
          <TextField
            style={{ width: '20%' }}
            label="Search Patient"
            name="MR_No"
            required={true}
            value={this.state.MR_No}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"

          />
          <br></br>
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} type="submit"><b style={{ color: '#fff' }}>Search</b></Button>
        </form>
        {/* </div> */}

        <Table className='Patient Information'>
          <TableHead>
            <TableRow>
              <TableCell align="right" >Height</TableCell>
              <TableCell align="right">Blood Pressure</TableCell>
              <TableCell align="right">PO2</TableCell>
              <TableCell align="right">Pulse</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"></TableCell>



            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row,index) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    label="Height(cm)"
                    name="Height"
                    required={true}
                    value={row.height}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                  /></TableCell>
                <TableCell align="right">
                  <TextField
                    label="Height(cm)"
                    name="Height"
                    required={true}
                    value={row.bloodpressure}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                  /></TableCell>

                <TableCell align="right">
                  <TextField
                    label="Height(cm)"
                    name="Height"
                    required={true}
                    value={row.po2}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                  /></TableCell>
                <TableCell align="right">
                  <TextField
                    label="Height(cm)"
                    name="Height"
                    required={true}
                    value={row.pulse}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                  /></TableCell>

                <TableCell align="right">
                  <TextField
                    label="Height(cm)"
                    name="Height"
                    required={true}
                    value={row.weight}
                    onChange={this.handleChange}
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                  /></TableCell>
                <TableCell align="right">{row.datetimes}</TableCell>

                <TableCell align="right">
                  <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} onClick={(rows)=>this.editVitals.bind(this,rows)}><b style={{ color: '#fff' }}>Edit Vitals</b></Button>
                </TableCell>

                <TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <br></br>
        <br></br>
        {/* <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} onClick={this.editVitals}><b style={{ color: '#fff' }}>Edit Vitals</b></Button> */}


      </div>

    )
  }
}
SearchPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchPatient)