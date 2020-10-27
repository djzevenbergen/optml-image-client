import React, { useState, useContext, useEffect } from "react";
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { message } from 'antd'
import SignUp from "./SignUp";
import { UserContext } from '../../userContext'
import { MyContext } from "../../context.js"
import { withFirebase } from 'react-redux-firebase'


function SignIn() {

  const [hidden, setHidden] = useState(false);
  const [signup, setSignup] = useState(false);
  const { value, setValue } = useContext(UserContext);
  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      message.success("you signed in");
      setHidden(!hidden);
      setValue(firebase.auth().currentUser);
    }).catch(function (error) {
      message.error(error.message);
    });
  }

  function onClick() {
    setSignup(!hidden);
  }

  function signToggle() {
    setSignup(!signup);
  }

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      console.log("Successfully signed out!");
      setValue(null);
      setUser(null);

    }).catch(function (error) {
      console.log(error.message);
    });
  }

  useEffect(() => {
    console.log(context.state)
    setUser(auth.currentUser)
    setValue(auth.currentUser)
  }, [auth.currentUser])


  return (
    <React.Fragment>


      <div className="main-container">

        {hidden ? <Redirect to="/home" /> : ''}
        {auth.currentUser ? <div><h6>You sure you wanna go?</h6><button className="card-button" variant="danger" onClick={doSignOut}>Yuhh</button></div> : <div>
          <div className="registerLink">
            <h6>{signup ? "" : <span>Not </span>} Registered?  </h6>
            <h6 className="tinyButton" onClick={signToggle}>{signup ? <span>..Sign In</span> : <span>..Sign Up</span>} </h6>
          </div>
        </div>}
        {auth.currentUser ? "" :
          <div>
            {signup ? <SignUp onClick={onClick} /> :
              <div >
                <h1>Sign In</h1>
                <form onSubmit={doSignIn}>
                  <input
                    type='text'
                    name='signInEmail'
                    placeholder='Email' />
                  <br />
                  <input
                    type='password'
                    name='signInPassword'
                    placeholder='Password' />
                  <br /><br />
                  <button
                    className="card-button"
                    type='submit'
                    variant="danger"
                  >Sign In</button>
                </form>
              </div>}
          </div>}

      </div >
    </React.Fragment >
  );

}

export default SignIn;