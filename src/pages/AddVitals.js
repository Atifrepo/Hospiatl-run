import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid';
import { Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

const styles = ({
    root: {
      flexGrow: 0,
    },
    paper: {
      padding:  100,
      textAlign: 'center',

      //   color: theme.palette.text.secondary,
    },
  });
  

export default class AddVitals extends Component {
    
    constructor() {
        super()
        this.state = {
            Vitals: {
                MR_No: '',
                Height: '',
                Weight: '',
                BP_lower: '',
                BP_Upper: '',
                Pulse: '',
                Temprature: '',
                PO2: '',
                Allergies: '',
            }
        }

    }
    handleClick() {

        console.log('handle click login')
        console.log('user', this.state.Vitals)
        this.props.history.push('/AddVitals')
    }
    handleChange(changeValue, event) {
        this.state.Vitals[changeValue] = event.target.value;
        this.setState = ({
            Register: this.state.Vitals,
            // password:this.state.password
        })
        console.log('Register', this.state.Vitals)
    }
    
    render() {
   
        return (
            <div className={styles.root}>
            
              <Grid style={styles.paper} item xs={12}>
                <Paper className={styles.paper}>Add Vtials</Paper>
              </Grid>
              <Grid container spacing={24}>  
              <Grid item xs={12} sm={6}>
                <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
              
              </Grid>
         <Grid item xs={6} sm={3}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
              
              </Grid>
              <Grid item xs={6} sm={6}>
              <TextField className={styles.paper}
                variant="outlined"
                />
              </Grid>
      
            </Grid>
          </div>
        )
    }
}