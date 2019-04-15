import React,{Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
export default class AddEmployee extends Component{
constructor(){
    super()
this.state={
    Details:{
Name:'',
EmployeeID:'',
Password:'',
Password2:'',
Type:'',
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

              label="Name of Employee"
              value={this.state.Name}
              onChange={this.handleChange.bind(this, 'Name')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField className={styles.paper}

              label="Employee ID"
              value={this.state.EmployeeID}
              onChange={this.handleChange.bind(this, 'EmployeeID')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField className={styles.paper}

              label="Set Password"
              value={this.state.Password}
              onChange={this.handleChange.bind(this, 'Password')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField className={styles.paper}

              label="Confirm Passowrd"
              value={this.state.Password2}
              onChange={this.handleChange.bind(this, 'Password2')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
          <FormControl variant="outlined">
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-age-simple"
            >
              Role
          </InputLabel>
            <Select
              value={this.state.type}
              onChange={this.handleChange.bind(this, 'type')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="type"
                  id="outlined-age-simple"
                />
              }
            >
              {/* <MenuItem value=""> */}
                {/* <em value={'Admin'}>Admin</em> */}
              {/* </MenuItem> */}
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Doctor'}>Doctor</MenuItem>
              <MenuItem value={'Nurse'}>Nurse</MenuItem>
              <MenuItem value={'Receptionist  '}>Receptionist</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          </Grid>  
        </div>
    )
}
}