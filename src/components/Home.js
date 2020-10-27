

import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';

import firebase from "firebase/app";
import SignIn from './auth/SignIn';
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

const Profile = (props) => {
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
      <div>
        <h1>Welcome!</h1>
        <p>This is a work in progress.</p>
        <p>Make an account and start uploading tracks (one at a time for now)</p>
        <p>You can then create a song with any tracks that you have</p>
        <p>You can then go to the home page and look at other people's songs and listen to them</p>
        <p>Right now the stop function doesn't work for songs, so you need to refresh to stop the song</p>
        <p>If you want to mix a song, you can change the volume of individual tracks in the mixer but only before playing, you can then save.</p>
        <p>When you save and come back, you can then hear the changed levels</p>
        <p>If you want to add a track to another person's song, you just to need click propose track</p>
        <p>The owner can listen to the track and either accept or reject it</p>
      </div>

      {console.log("screech")}
    </React.Fragment>
  );
}

export default withFirestore(Profile);