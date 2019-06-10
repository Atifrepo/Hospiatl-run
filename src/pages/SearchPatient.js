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
import Divider from '@material-ui/core/Divider';

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
    this.AddNotes = this.AddNotes.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);



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
      receivenote: [],
      DoctorName:''
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




  AddNotes = (event) => {
    event.preventDefault();
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;
    var Search = {
      patientid: this.state.patientid,
      note: this.state.note,
      date: dateString
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

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/addnote', {
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
          toastr.options = {
            positionClass: 'toast-bottom-left',
            hideDuration: 300000,
            timeOut: 100
          }
          toastr.clear()
          setTimeout(() => toastr.success(`Note Added`), 300)
        }
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Error occured`), 300)
      })




  }

  handleClickOpen(ab) {

    var Search = {
      dates: ab.datetimes,
      patientid: this.state.patientid
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

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/getnotes', {
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
          receivenote: result,
          DoctorName:result[0].doctorname,
        })
console.log('res',result)
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`No Notes`), 300)
      })




    this.setState({
      open: true,
    });

  };






  handleClose = () => {
    this.setState({ open: false });
  };




  render() {

    return (



      <div style={{ overflowX: "hidden" }}>
        <DoctorAppBar />
        <h2 style={{ color: '#2699FB', position: 'absolute' }}>Search patient</h2>
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
              <TableCell >MR Number</TableCell>
              <TableCell> Name</TableCell>
              <TableCell >Age</TableCell>
              <TableCell >Blood Pressure</TableCell>
              <TableCell >Height</TableCell>
              <TableCell >PO2</TableCell>
              <TableCell >Pulse</TableCell>
              <TableCell >Weight</TableCell>
              <TableCell >Date</TableCell>
              <TableCell >Allergy</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell >{row.mr_no}</TableCell>
                <TableCell >{row.patientname} {row.patientlastname}</TableCell>
                <TableCell >{row.age}</TableCell>
                <TableCell >{row.bloodpressure}</TableCell>
                <TableCell >{row.height}</TableCell>
                <TableCell >{row.po2}</TableCell>
                <TableCell >{row.pulse}</TableCell>
                <TableCell >{row.weight}</TableCell>
                <TableCell >{row.datetimes}</TableCell>
                <TableCell >{row.allergie}</TableCell>

                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => { this.handleClickOpen(row) }}>
                    <b>
                      View Notes
        </b>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div >
          <Dialog

            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Added Notes
          </DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                {this.state.receivenote.map(row => (
                  <div>
                    {row.notetext}
{this.state.DoctorName}
                  </div>

                ))}
              </Typography>
              <Divider/>
              <Typography gutterBottom >
                Added By: <b> {this.state.DoctorName}</b>
          
              </Typography>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
        </div>
        {/* <div style={{ paddingLeft: 500, paddingTop: 100,position:'fixed' }}> */}
        <h3 style={{ color: '#2699FB' }}>Notes/Diagnostics Results/Prescription</h3>
        <form onSubmit={this.AddNotes}>
          <TextField style={{ width: '80%' }}
            id="outlined-multiline-static"

            multiline
            rows="10"
            name="note"
            required={true}
            value={this.state.note}
            onChange={this.handleChange}

            margin="normal"
            variant="outlined"
          />
          <br></br>
          <br></br>
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} type="submit"><b style={{ color: '#fff' }}>Add Notes</b></Button>
        </form>
        {/* </div> */}
      </div>

    )
  }
}
SearchPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchPatient)