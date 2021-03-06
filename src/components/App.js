import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from './Header';

import SignIn from './auth/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../userContext';

import Home from "./Home";
import Upload from "./Upload";
import UserProfile from "./UserProfile";


import 'antd/dist/antd.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const lightTheme = {
  font: 'Courier',
  primary: '#ffc7c7',
  secondary: '#f6f6f6',
  light: '#ccd6f6',
  white: '#aaaaaa',
  url: "././darklogo.png",
};

const darkTheme = {
  font: 'Courier',
  primary: '#30475e',
  secondary: '#222831',
  light: '#f2a365',
  white: '#ececec',
  url: "././logo.png",
}

// const stripePromise = loadStripe(
//   "pk_test_51HkDM6Hnepz07q3sOlwTDA5r0ConQc1yFJ3XemTKKFKdzILL2Dl2JR5Bm6vmn6YPLlg4n4vCkjeqQdIflhp06uJt00Y9dSLj25"
// );

const stripePromise = loadStripe(
  "pk_test_51HjvNPIlDhRSkzlbqOR5DXCGwoMqc9Ffw12Nicpfp66F8hfsKy88eXGRkGx9tVk1PzImunYN7DRJeQUN2Wa3efan00JZNot4Eh"
);

function App() {
  const [value, setValue] = useState(null)
  const [theme, changeTheme] = useState(darkTheme)

  const toggleTheme = () => {
    if (theme === lightTheme) {
      changeTheme(darkTheme)
    } else {
      changeTheme(lightTheme)
    }

  }


  return (

    <Router>
      <UserContext.Provider value={{ value, setValue }} theme={{ theme, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Header theme={{ theme, toggleTheme }} />
          <Switch>
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route exact path='/home'>
              <Home />
            </Route>
            <Route path='/upload'>
              <Upload />
            </Route>
            <Route path='/profile'>
              <Elements stripe={stripePromise}>
                <UserProfile />
              </Elements>
            </Route>
          </Switch>
        </ThemeProvider>
      </UserContext.Provider>
    </Router >
  );
}

export default App;