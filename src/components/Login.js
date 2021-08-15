import React, { useState } from "react";
import { Route, Redirect, useHistory } from "react-router";
import axios from 'axios'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()
  const defaultUser = {
    username: '',
    password: ''
  }
  const [credentials, setCredentials] = useState(defaultUser)
  const [error, setError] = useState("");
  //replace with error state

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(`http://localhost:5000/api/login`, credentials)
      .then(resp => {
        setError("")
        localStorage.setItem('token', resp.data.payload)
        history.push('/')
      })
      .catch(err => setError("credentials not good"))
  }

  const handleChange = e => {
    setError("")
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    {localStorage.getItem('token') === null?
      <Route path="/login">
        <div>
          <h1>Welcome to the Bubble App!</h1>
          <div data-testid="loginForm" className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} >
              <label>Username 
                <input id="username" name="username" type='text' onChange={handleChange} placeholder="username"/>
              </label>
              <label>Password
                <input id="password" name="password" type='password' onChange={handleChange} placeholder="Password"/>
              </label>
              <button>Login</button>
            </form>
          </div>

          <p id="error" className="error">{error}</p>
        </div>
      </Route>
      :
      <Redirect to='/'/>
      }
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"