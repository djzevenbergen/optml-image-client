import React, { useState, useEffect, useContext } from 'react';
import '../index.css';
import firebase from "firebase/app";
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../userContext';
import { MyContext } from "../context.js"

import { Jumbotron, Navbar, Nav, Col } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';


const theme = {
  font: 'Courier',
  primary: '#0a192f',
  secondary: '#303C55',
  light: '#ccd6f6',
  white: '#e6f1ff',

};

const UserProfile = (props) => {
  const firestore = useFirestore();
  const [value, setValue] = useState(UserContext);


  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const [deleteBool, setDeleteBool] = useState(false);




  useEffect(() => {
    console.log(context.state.user)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      setValue(auth.currentUser);
    }

  }, [context.state.user])

  return (
    <React.Fragment>


      {/* {user ? "" : */}
      <div className='container'>
        <h1>This is the User Profile Page</h1>
        <h2>Ideally this is where you would see a user's upload history</h2>
        <p>Or Maybe a user would be able to see their own upload history?</p>
        <p>What about having access to the library of things that they've uploaded.</p>
        <p>And to the larger libary of other things that people have uploaded??  or maybe that's for another page.</p>
      </div>

      {console.log("screech")}
    </React.Fragment>
  );
}

export default withFirestore(UserProfile);