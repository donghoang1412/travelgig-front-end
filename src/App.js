import './App.css';
import DisplayAndFilterContainer from './Components/DisplayAndFilterComponent/DisplayAndFilterContainer';
import SearchHotelContainer from './Components/SearchHotelComponent/SearchHotelContainer';
import HeaderContainer from './CommonComponent/HeaderComponent/HeaderContainer';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React from 'react';
import LoginContainer from './CommonComponent/LoginComponent/LoginContainer';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeComponent} />
        {/* <Route path="/login" component={LoginContainer} /> */}
        <Route path="*" component={UnauthorizeComponent} />

      </Switch>
    </Router>
  );
}

export default App;

const HomeComponent = () => {
  return (
    <React.Fragment>
      <div className="App">

        <div className="container-fluid" >
          <div className="headercontainer">
            <h1><i class="fa fa-globe"></i>Welcome to Travel Gig</h1>
          </div>
          <div className="nav">
            <HeaderContainer />
          </div>
        </div>
        <SearchHotelContainer />
        <DisplayAndFilterContainer />
      </div>

    </React.Fragment>
  )
}

const UnauthorizeComponent = () => {
  return (
    <div>
      <p>UnauthorizeComponent</p>
    </div>
  )
}
