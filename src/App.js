import React, { Component } from 'react';
import Login from './pages/login'
import MenuAppBar from './Appbar'
import RegisterPatient from './pages/RegisterPatient';
import Drawer from './Drawer';
import AddVitals from './pages/AddVitals';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
     
<MenuAppBar/>
<Router>
  <div>
  <Route exact path='/' component={Login} />
  <Route exact path='/Register' component={RegisterPatient} />
   <Route exact path='/AddVitals' component={AddVitals} />
  </div>
</Router>
<Drawer/>
       {/* <Login/> */}
      </div>
    );
  }
}

export default App;
