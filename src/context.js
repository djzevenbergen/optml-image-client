import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
import { withFirestore, isLoaded } from 'react-redux-firebase';
export const MyContext = createContext()

function MyProvider(props) {

  const auth = firebase.auth();

  const [state, setState] = useState({
    user: {},
    isLogged: false
  })


  useEffect(() => {
    console.log(firebase.auth());

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("logged in" + user.email);
        setState({ user, isLogged: true })

      } else {
        console.log("not logged in")
      }
    });

    const callthisback = (obj) => {
      console.log(obj)
      console.log(obj.currentUser);
    }
    callthisback(auth)
    console.log(auth.currentUser);
  }, [auth])


  const setUser = user => {
    setState(prevState => ({
      ...prevState,
      user,
      isLogged: !prevState.isLogged
    }))
  }

  return (
    <MyContext.Provider
      value={{
        state,
        setUser
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider