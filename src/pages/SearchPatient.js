import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
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






class SearchExistingPatient extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.AddNotes = this.AddNotes.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    


    this.state = {

      MR_No: '',
      Name: '',
      Fathername: '',
      Age: '',
      multiline: '',
      note:'',
      patientid:'',
      rows:[],
      receivenote: ''
    }


  }


  






  handleChange({ target }) {
    this.setState({
      [target.name]: target.value

    })
    console.log('Register', this.state.MR_No)
  }




  handleSearch() {

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

    console.log("Form Body", formBody);
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

        console.log("Response from server", result);
        this.setState({ Name: result[0].patientname, Fathername: result[0].fathername, Age: result[0].age , patientid:result[0].patientid });
        console.log("State after setting", this.state)
 //        result.forEach((item, i) => {
 //    this.rows.push(createData(item.paitentname, item.fathername, item.age,item.patientid,'abc'));
 // });

      this.setState({
        rows: result
      })

      console.log("rows after result",this.state.rows);
      
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Patient Not found`), 300)
      })

  }
  



  AddNotes() {

    console.log('add notes');
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var dateString = date + "-" +(month + 1) + "-" + year;
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

    console.log("Form Body", formBody);
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
          positionClass: 'toast-top-right',
          hideDuration: 3000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.success(`Note Added`), 300)
        }
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Error occured`), 300)
      })




  }

  handleClickOpen(ab) {
    console.log('ab',ab.datetimes);
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

    console.log("Form Body", formBody);
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
         console.log("Response",resp);
         var data = resp.json();
          return data;

         }
      })
      .then((result)=>{
        console.log("Response from server", result);
        this.setState({
          receivenote: result[1].notetext
        })
        console.log(this.state.receivenote);

      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-top-right',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Error occured`), 300)
      })



    
    this.setState({
      open: true,
    });
  
  };






  handleClose = () => {
    this.setState({ open: false });
  };

   handleClick = (name) => {
    console.log(name);
  }



  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
        <DoctorAppBar/>
          <h2 style={{ color: '#2699FB', position: 'absolute' }}>Search patient</h2>
          <TextField
            label="Search Patient"
            name="MR_No"
            value={this.state.MR_No}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} onClick={this.handleSearch}>Search</Button>
           
         </div>

        <Table className='Patient Information'>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Blood Pressure</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">MR Number</TableCell>
            <TableCell align="right">PO2</TableCell>
            <TableCell align="right">Pulse</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Date</TableCell>
     

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map(row => (
            <TableRow key={row.id}>
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="right">{row.patientname}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.bloodpressure}</TableCell>
              <TableCell align="right">{row.height}</TableCell>
              <TableCell align="right">{row.mr_no}</TableCell>
              <TableCell align="right">{row.po2}</TableCell>
              <TableCell align="right">{row.pulse}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.datetimes}</TableCell>

                <TableCell>
                <Button variant="outlined" color="secondary" onClick={()=>{this.handleClickOpen(row)}}>
         View Notes
        </Button> 
        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </Typography>
</DialogContent>
</Dialog>
        <div style={{ paddingLeft: 500, paddingTop: 100,position:'fixed' }}>
        <h3 style={{ color: '#2699FB'}}>Notes/Diagnostics Results/Prescription</h3>
          <TextField style={{ width: '200%' }}
            id="outlined-multiline-static"

            multiline
            rows="10"
            name="note"
            value={this.state.note}
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <br></br>
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%', }} onClick={this.AddNotes}>Add Notes</Button>
        </div>
      </div>

    )
  }
}
SearchExistingPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchExistingPatient)