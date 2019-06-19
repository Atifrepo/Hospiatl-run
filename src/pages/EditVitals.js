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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },

root: {
  marginLeft: theme.spacing.unit*13,
  marginRight: theme.spacing.unit*13,

},
  



});

class EditVitals extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.editVitals = this.editVitals.bind(this,index);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.edited = this.edited.bind(this)

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
      Vitals: [],
      weight: '',
      height: '',
      PO2: '',
      BP: '',
      Allergy: '',
      pulse: '',
      id: '',
      patientid: '',
      temperature: '',
      datetimes: '',
      vitals_id: '',
    }



  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value

    })

  }



  edited(event) {
    console.log('all')
    console.log('hei', this.state.height)
    event.preventDefault();
    var EditVitalForm = {
      vitalsid: this.state.id,
      patientid: this.state.patientid,
      heights: this.state.height,
      weight: this.state.weight,
      bloodpressure: this.state.BP,
      pulse: this.state.pulse,
      temperature: this.state.temperature,
      po2: this.state.PO2,
      allergie: this.state.Allergy,
      datetimes: this.state.datetimes,

    };


    var formBody = [];
    for (var property in EditVitalForm) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(EditVitalForm[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/editpatientvitals', {
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
          setTimeout(() => toastr.success(`Patient record updated`), 300)
        }
      })
      .catch((error) => {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.error(`Patient record not updated`), 300)
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
          rows: result,
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

  handleClose = () => {
    this.setState({ open: false });
  };


  editVitals(rows) {
    console.log('all', rows)
    console.log(rows.vitals_id);
    this.setState({
      id: rows.vitals_id,
      MR_No: rows.mr_no,
      patientid: rows.patientid,
      weight: rows.weight,
      height: rows.height,
      pulse: rows.pulse,
      temperature: rows.temperature,
      BP: rows.bloodpressure,
      PO2: rows.po2,
      Allergy: rows.allergie,
      datetimes: rows.datetimes,

    })
    console.log('what is', this.state.Vitals)
  };
  handleClickOpen() {
    this.setState({
      open: true
    })
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
          <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} type="submit" ><b style={{ color: '#fff' }}>Search</b></Button>
        </form>
        {/* </div> */}

        <Table className='Patient Information'>
          <TableHead>
            <TableRow>
              <TableCell >Height</TableCell>
              <TableCell >Blood Pressure</TableCell>
              <TableCell >RBS</TableCell>
              <TableCell >Pulse</TableCell>
              <TableCell >Weight</TableCell>
              <TableCell >Date</TableCell>
              <TableCell>Allergy</TableCell>
              <TableCell ></TableCell>



            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row, index) => (
              <TableRow key={row.id} onClick={this.editVitals.bind(this, row)}>
                <TableCell>


                  {row.height}</TableCell>
                <TableCell>
                  {row.bloodpressure}
                </TableCell>

                <TableCell >
                  {row.po2}
                </TableCell>
                <TableCell >
                  {row.pulse}
                </TableCell>

                <TableCell>
                  {row.weight}
                </TableCell>
                <TableCell>
                  {row.datetimes}
                </TableCell>
                <TableCell >{row.allergie}</TableCell>

                <TableCell >
                  <Button variant="outlined" style={{ backgroundColor: '#2699FB', }} onClick={() => { this.handleClickOpen(row) }} ><b style={{ color: '#fff' }}>Edit Vitals</b></Button>
                </TableCell>

                <TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
        <Dialog 
          width="30%"
        
          maxWidth='lg'
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle style={{ backgroundColor: '#2699FB' }} id="customized-dialog-title" onClose={this.handleClose}>
            Edit Vitals
          </DialogTitle>
         <div className={classes.root}>
          <form onSubmit={this.edited}>
            <TextField
              disabled
              value={this.state.MR_No}
label="MR_No"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              style={{ backgroundColor: '#fff' }}
            />
           
           
            <TextField
              label="weight"
              name="weight"
              value={this.state.weight}

              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              label="height"
              name="height"
              onChange={this.handleChange}
              value={this.state.height}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
<br></br>
            <TextField
              label="Blood Pressure"
              name="BP"
              onChange={this.handleChange}
              value={this.state.BP}
              margin="normal"
              variant="outlined"
              className=
              {classes.textField}
            />
    
            <TextField
              label="RBS"
              name="PO2"
              onChange={this.handleChange}
              value={this.state.PO2}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />


            <TextField
              label="pulse"
              name="pulse"
              onChange={this.handleChange}
              value={this.state.pulse}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
    <br></br>
            <TextField
              label="Allergy"
              name="Allergy"
              onChange={this.handleChange}
              value={this.state.Allergy}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
              
            <br></br>
            <Button variant="outlined"  style={{ backgroundColor:"#2699FB",marginLeft:'1%',marginBottom:'5%'}} type="submit">
            <b style={{color:'#fff'}}> save changes</b>
      </Button>
          </form>
          </div>
        </Dialog>
        <br></br>
        <br></br>
      </div>
      </div>
    )
  }
}
EditVitals.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditVitals)