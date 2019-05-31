import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import DoctorAppBar from '../DoctorAppbar'
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



class EditInfo extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      patientid: '',
      patientname: '',
      patientlastname: '',
      patientfathername: '',
      age: '',
      gender: '',
      telephone1: '',
      telephone2: '',
      mrnumberreceived: '',
      MR_No: '',
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
        console.log(result);
        this.setState({patientid:result[0].patientid,patientname: result[0].patientname,patientlastname:result[0].patientlastname, patientfathername: result[0].fathername, age: result[0].age, gender: result[0].gender, telephone1: result[0].telephone1,telephone2:result[0].telephone2,mrnumberreceived: result[0].mr_no });
        console.log(this.state);
    

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





editdetails = (event) => {

  event.preventDefault();
    var EditForm = {
      patientid: this.state.patientid,
      patientname:this.state.patientname,
      patientlastname:this.state.patientlastname,
      patientfathername:this.state.patientfathername,
      age:this.state.age,
      gender:this.state.gender,
      telephone1:this.state.telephone1,
      telephone2:this.state.telephone2,
      mrnumber:this.state.mrnumberreceived,
    };


    var formBody = [];
    for (var property in EditForm) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(EditForm[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/editpatientdetails', {
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








render(){
    const { classes } = this.props;
    return(
<div>
<DoctorAppBar/>
          <h2 style={{ color: '#2699FB', position: 'absolute' }}>Edit Patient Information</h2>
<div>
<form onSubmit={this.handleSearch}>
<br></br> 
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


<form onSubmit={this.editdetails}>

<TextField
          label="Name"
          name="patientname"
          value={this.state.patientname}
          required={true}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
   <TextField
          label="Last Name"
          name="patientlastname"
          value={this.state.patientlastname}
          required={true}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
<br></br>


        <TextField
          label="Husband/Father Name"
          required={true}
          name="patientfathername"
          value={this.state.patientfathername}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />

      
        <TextField
          label="Age"
          required={true}
          name="age"
          value={this.state.age}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
<br></br>
        <TextField
          label="Telephone#1"
          required={true}
          name="telephone1"
          value={this.state.telephone1}

          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
<TextField
          label="Telephone#2"
          name="telephone2"
          value={this.state.telephone2}
          required={true}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        
        <br></br>
<TextField
          label="MR NO."
          name="mrnumberreceived"
          value={this.state.mrnumberreceived}
          required={true}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
        
<br></br>

<Button variant="outlined" style={{ backgroundColor: '#2699FB', }} type="submit" ><b style={{color:'#fff'}}>Edit Details</b></Button>
</form>
</div>
</div>
    )
}
 }
 EditInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(EditInfo)