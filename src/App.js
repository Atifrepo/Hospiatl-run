import React, { Component } from 'react';
import Login from './pages/login'
import AppBar from '@material-ui/core/AppBar';
import LoginAdmin from './pages/LoginAdmin'
import RegisterPatient from './pages/RegisterPatient';
import AddVitals from './pages/AddVitals';
import EditEmployee from './pages/EditEmployee';
import AddEmployee from './pages/AddEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import SearchPatient from './pages/SearchPatient';
import SearchExistingPatient from './pages/SearchExistingPatient'
import ViewAllPatient from './pages/ViewAllPatient'
import Cookies from 'universal-cookie';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditInfo from './pages/EditInfo'
import SearchForNurse from './pages/SearchForNurse'
import EditVitals from './pages/EditVitals'
import ViewAllPatientR from './pages/ViewAllPatientR'
import ViewAllPatientN from './pages/ViewAllPatientN'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';



var jwtDecode = require('jwt-decode');
const cookies = new Cookies();



const ProtectedRouteforReceptionist = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {

        return loggedIn == "Receptionist" ? <Comp {...props} /> : <Redirect to="/" />;

      }}
    />
  );
};


const ProtectedRouteforDoctor = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {

        return loggedIn == "Doctor" ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};


const ProtectedRouteforNurse = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {

        return loggedIn == "Nurse" ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

const ProtectedRouteforAdmin = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {

        return loggedIn == "Admin" ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};



class App extends Component {
  constructor() {
    super();
  }


  state = {
    cookierolevalue: cookies.get('roles'),
  };


componentDidMount(){

}

 


  render() {


    return (
      <div className="App">

        <AppBar position="static" style={{ backgroundColor: '#2699FB', justifyContent: 'center' }}>
          <Toolbar>
            <Typography variant="h5" color="inherit" style={{ justifyContent: 'right', flexGrow: 1, }}>
              Prime Specialist Clinic
          </Typography>
          </Toolbar>
        </AppBar>

        <Router>
          <div>

            <Route exact path='/' component={Login} />
            <ProtectedRouteforReceptionist path='/Register' loggedIn={this.state.cookierolevalue} component={RegisterPatient} />
            <ProtectedRouteforReceptionist exact path='/SearchExistingPatient' loggedIn={this.state.cookierolevalue} component={SearchExistingPatient} />
            <ProtectedRouteforReceptionist exact path='/ViewAll' loggedIn={this.state.cookierolevalue} component={ViewAllPatientR} />
            <ProtectedRouteforNurse path='/AddVitals' loggedIn={this.state.cookierolevalue} component={AddVitals} />
            <ProtectedRouteforNurse path='/SearchAll' loggedIn={this.state.cookierolevalue} component={SearchForNurse} />
            <ProtectedRouteforNurse path='/ViewAllN' loggedIn={this.state.cookierolevalue} component={ViewAllPatientN} />
            <ProtectedRouteforDoctor exact path='/SearchPatient' loggedIn={this.state.cookierolevalue} component={SearchPatient} />
            <ProtectedRouteforDoctor exact path='/ViewAllPatient' loggedIn={this.state.cookierolevalue} component={ViewAllPatient} />
            <ProtectedRouteforDoctor exact path='/EditVitals' loggedIn={this.state.cookierolevalue} component={EditVitals} />
            <ProtectedRouteforDoctor exact path='/EditInfo' loggedIn={this.state.cookierolevalue} component={EditInfo} />
            <ProtectedRouteforAdmin exact path='/AddEmployee' loggedIn={this.state.cookierolevalue} component={AddEmployee} />
            <ProtectedRouteforAdmin exact path='/DeleteEmployee' loggedIn={this.state.cookierolevalue} component={DeleteEmployee} />
            <ProtectedRouteforAdmin exact path='/EditEmployee' loggedIn={this.state.cookierolevalue} component={EditEmployee} />
            <Route exact path="/Admin" component={LoginAdmin} />


          </div>
        </Router>
        {/* <Drawer/> */}

      </div>
    );
  }
}

export default App;
