import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NurseAppbar from '../NurseAppbar'
import Cookies from 'universal-cookie';
import toastr from 'toastr'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Multiselect from 'multiselect-dropdown-react';
import { DropDownMenu, MenuItem } from "material-ui";
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import {deepOrange500} from 'material-ui/styles/colors'

const cookies = new Cookies();

const styles = theme => ({

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // marginTop:theme.spacing.unit*4,
  },
  dense: {
    // width:'80%'
    marginTop: 16,
  },

  menu: {
    width: 200,
  },
  textField1: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 9,

  },
  TableCell:{
    fontSize:15,
    fontWeight:'bold'
  }


});

class AddVitals extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.patientvital = this.patientvital.bind(this);
  
    this.Search = this.Search.bind(this);

    this.state = {

      MR_No: '',
      Height: '',
      Weight: '',
      BP: '',
      Pulse: '',
      Temperature: '',
      RPS: '',
      Allergies: '',
      DateTime: '',
      rolecookies: '',
      Allergy: '',
      PatientName: '',
      PatientFatherName: '',
      Age: '',
      patientid: '',
      labelWidth: 0,
      AllergyArray: [],
      rows: [],
      multiSelect: []

    }
    this.muiTheme = getMuiTheme({
      palette: {
          accent1Color: deepOrange500
      }
      , userAgent: props.userAgent
  })
  }
  result(params) {
    console.log(params);
  }
  handleSelect (event, index, value)
    {
        debugger
        this.setState({ value })
};
 
  handleChange({ target }) {

    this.setState({
      [target.name]: target.value

    })
   
  }

  optionClicked(optionsList) {
    this.setState({ multiSelect: optionsList });
}
selectedBadgeClicked(optionsList) {
  this.setState({ multiSelect: optionsList });
}

  Search = (event) => {

    event.preventDefault();
    var Search = {
      searchmrnumber: this.state.MR_No
    };

    this.setState({
      rows: [],
      patientid: ''
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
       
        this.setState({
          rows: result,
          patientid: result[0].patientid
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




  patientvital = (event) => {
    event.preventDefault();
     var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;

    var Vitals = {
      heights: this.state.Height,
      weight: this.state.Weight,
      bloodpressure: this.state.BP,
      pulse: this.state.Pulse,
      temperature: this.state.Temperature,
      po2: this.state.RPS,
      datetimes: dateString,
      allergie: this.state.Allergy,
      patientid: this.state.patientid,
    };
    var formBody = [];
 
    for (var property in Vitals) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(Vitals[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

   
    var Authtoken = cookies.get('token')
    var finalAuthtoken = 'Bearer ' + Authtoken

    fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/addpatientvitals', {
      method: 'POST',
      withCredentials: true,

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': finalAuthtoken

      },
      body: formBody

    }).then((resp) => {
      if (resp.ok) {
        toastr.options = {
          positionClass: 'toast-bottom-left',
          hideDuration: 300000,
          timeOut: 100
        }
        toastr.clear()
        setTimeout(() => toastr.success(`Patient Vitals Added`), 300)
      }
    })

this.setState({
  MR_No:'',
  Height: '',
  Weight: '',
  BP: '',
  Pulse: '',
  Temperature: '',
  RPS: '',
  Allergy:'',
})
  }

 

componentDidMount(){
  var tokencookis=cookies.get('token')
  console.log('token',tokencookis)
  if(!tokencookis){
    window.location.href ='/'
  
    console.log('not cookie')
    }
}



  render() {
    const { classes } = this.props;
    const data = [{
      name: 'one',
      value: 'one'
    },
    {
        name: 'two',
        value: 'two'
      },
      {
        name: 'three',
        value: 'three'
      },
      {
        name: 'four',
        value: 'four'
      },
      {
        name: 'five',
        value: 'five'
      },
      {
        name: 'six',
        value: 'six'
      }];
    return (

      <div >

        <div>


          <h2 style={{ color: '#2699FB' }}>Add Vitals of Patient</h2>
          <NurseAppbar />

          <div  >
          <form onSubmit={this.Search}>
            <TextField
              label="Enter MR_No"
              name="MR_No"
              required={true}
              value={this.state.MR_No}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <Button variant="outlined" style={{ backgroundColor: '#2699FB', marginTop: '2%' }} type="submit"><b style={{ color: '#fff' }}>Search</b></Button>
</form>

          </div>

          <Table className='Patient Information'>
            <TableHead>
              <TableRow>
                <TableCell> Name</TableCell>
                <TableCell > Father Name</TableCell>
                <TableCell > Age</TableCell>
                <TableCell > Gender</TableCell>
                <TableCell > Mobile Number 1</TableCell>
                <TableCell > Mobile Number 2</TableCell>
                <TableCell > MR Number</TableCell>



              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row => (
                <TableRow key={row.id}>
                  {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                  <TableCell className={classes.TableCell} >{row.patientname} {row. patientlastname} </TableCell>
                  <TableCell className={classes.TableCell}>{row.fathername}</TableCell>
                  <TableCell className={classes.TableCell}>{row.age}</TableCell>
                  <TableCell className={classes.TableCell}>{row.gender}</TableCell>
                  <TableCell className={classes.TableCell}>{row.telephone1}</TableCell>
                  <TableCell className={classes.TableCell}>{row.telephone2}</TableCell>
                  <TableCell className={classes.TableCell}>{row.mr_no}</TableCell>

                  <TableCell>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


          <br></br>
          <form onSubmit={this.patientvital}>
          <TextField
            label="Height(cm)"
            name="Height"
            required={true}
            value={this.state.Height}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="Weight(kg)"
            name="Weight"
            required={true}
            value={this.state.Weight}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="BP(mmHg)"
            name="BP"
            required={true}
            value={this.state.BP}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Pulse(bpm)"
            name="Pulse"
            required={true}
            value={this.state.Pulse}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
          <br></br>

          <TextField
            label="Temperature(°F)"
            name="Temperature"
            required={true}
            value={this.state.Temperature}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />

          <TextField
            label="RPS"
            name="RPS"
            required={true}
            value={this.state.RPS}
            onChange={this.handleChange}
            variant="outlined"
            className={classes.textField}
            margin="normal"
          />
  {/* <MuiThemeProvider muiTheme={this.muiTheme}>
                <div>
                    <DropDownMenu primaryText="select" value={this.state.value} multiple={true} onChange={this.handleSelect.bind(this)} >
                      
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </DropDownMenu>
                    <br />

                </div>
            </MuiThemeProvider> */}
 <div className="App">
        <Multiselect options={data} onSelectOptions={this.result} />
      </div>
          <br></br>

          <br></br>
          <Button type="submit" variant="outlined" style={{ backgroundColor: '#2699FB', position: 'relative' }} ><b style={{ color: '#fff' }}>Add Vitals</b></Button>
</form>
        </div>

      </div>


    )
  }
}
AddVitals.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddVitals)