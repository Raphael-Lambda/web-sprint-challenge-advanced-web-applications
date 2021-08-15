// import React, { useState } from "react";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import { axiosWithAuth }  from "./helpers/axiosWithAuth";
import "./styles.scss";

import BubblePage from './components/BubblePage'
import { PrivateRoute } from "./components/PrivateRoute";
import axios from "axios";

function App() {
  const history = useHistory()

  const handleLogout = () => {
    axiosWithAuth()
      .post('http://localhost:5000/api/logout')
      .then(resp => {
        localStorage.removeItem('token');
        history.push('/');
      })
      .catch(err => console.log('err : ', err))
  }

  return (
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={handleLogout}>logout</a>
        </header>
        <Switch>
          <Route path='/login'>
              <Login/>
          </Route>
          <PrivateRoute component={BubblePage} path='/' />
        </Switch>
      </div>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.