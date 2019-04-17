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
  Link
} from 'react-router-dom';
const cookies=new Cookies();


class App extends Component {
constructor(){
  super();
 

}

    

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
  <Route exact path='/Register' component={RegisterPatient} />
   <Route exact path='/AddVitals' component={AddVitals} />
   <Route exact path='/AddEmployee' component={AddEmployee} />
   <Route exact path='/DeleteEmployee' component={DeleteEmployee} />
   <Route exact path='/EditEmployee' component={EditEmployee} />
   <Route exact path='/Drawer' component={Drawer} />
  </div>
</Router>
<Drawer/>
       {/* <Login/> */}
      </div>
    );
  }
}

export default App;
