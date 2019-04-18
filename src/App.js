import React, { Component } from 'react';
import Login from './pages/login'
import MenuAppBar from './Appbar'
import RegisterPatient from './pages/RegisterPatient';
import Drawer from './Drawer';
import AddVitals from './pages/AddVitals';
import EditEmployee from './pages/EditEmployee';
import AddEmployee from './pages/AddEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import Cookies from 'universal-cookie';
// import isLoggedIn from '/helpers/is_logged_in';

import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';


const cookies=new Cookies();


// const PrivateRoute = ({ component: Component, ...rest }) => (

//   <Route {...rest} render={(props) => (
    
//     { === 'Receptionist'
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

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




class App extends Component {
    constructor(){
          super();
}


state = {
    cookierolevalue : cookies.get('roles'),
  };


    

select(){
  var rolecookis=cookies.get('roles')
  console.log('hi',rolecookis)
    if(rolecookis=="nurse"){

      }
}



  render() {
    
    
    return (
    
    <div className="App">
    
 <MenuAppBar/>
<Router>
  <div>
    
   <Route exact path='/' component={Login}  />
   <ProtectedRouteforReceptionist  path='/Register' loggedIn={this.state.cookierolevalue} component={RegisterPatient} />
   <ProtectedRouteforNurse path='/AddVitals' loggedIn={this.state.cookierolevalue} component={AddVitals} />
   <Route exact path='/AddEmployee' component={AddEmployee} />
   <Route exact path='/DeleteEmployee' component={DeleteEmployee} />
   <Route exact path='/EditEmployee' component={EditEmployee} />
   <Route exact path='/Drawer' component={Drawer} />
  </div>
</Router>
// <Drawer/>
       
      </div>
    );
  }
}

export default App;
