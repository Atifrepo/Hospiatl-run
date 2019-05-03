import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ViewAllPatient extends Component {
    constructor(){
        super()
        this.state={
            MR_No: '',
            Name: '',
            Fathername: '',
            Age: '',
            multiline: '',
            note:'',
            patientid:'',
            rows:[],
            receivenote: []
        }
    }
componentDidMount(){

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
  
      fetch('http://ec2-54-198-188-131.compute-1.amazonaws.com:3000/viewsearchpatient', {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': finalAuthtoken
  
        },
        body: formBody
  
      })
        // .then((resp) => {
  
        //   if (resp.status !== 200) {
        //     throw new Error("Not 200 response")
        //   }
  
        //   if (resp.ok) {
        //     var data = resp.json();
        //     return data;
        //   }
        // })
        .then((result) => {
        console.log('re',result)
          this.setState({ Name: result[0].patientname, Fathername: result[0].fathername, Age: result[0].age, Gender: result[0].gender, Phone_No: result[0].telephone1 });
          this.setState({
            rows: result
          })
        })
      
  
}
render(){
    return(
        <div>

          <Table className='Patient Information'>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
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
                <TableRow key={row.id}>
                  {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                  <TableCell align="right">{row.patientname}</TableCell>
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


        </div>
    )
}
}
export default (ViewAllPatient)