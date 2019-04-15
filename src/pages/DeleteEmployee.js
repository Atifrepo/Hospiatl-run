import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });
export default class EditEmployee extends Component{
constructor(){
    super()
this.state={
    Details:{
        EmployeeID:'',
        Password:'',
    }

}
}
handleChange(changeValue, event) {
    this.state.Details[changeValue] = event.target.value;
    this.setState = ({
      Details: this.state.Details,
      // password:this.state.password
    })
    console.log('login', this.state.Details)
  }

render(){
    return(
        <div>
<Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField className={styles.paper}

              label="Enter Employee ID"
              value={this.state.EmployeeID}
              onChange={this.handleChange.bind(this, 'EmployeeID')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
<br></br>
          <Grid item xs={6}>
            <TextField className={styles.paper}

              label="Enter admin Password"
              value={this.state.Password}
              onChange={this.handleChange.bind(this, 'Password')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          </Grid>            
        </div>
    )
}
}