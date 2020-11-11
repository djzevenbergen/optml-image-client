import React, { useState, useEffect, useContext } from 'react';
import '../index.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
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

  const stripe = useStripe();
  const elements = useElements();

  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const [deleteBool, setDeleteBool] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("/api/charge", { id, amount: 999 });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };


  useEffect(() => {
    console.log(context.state.user)
    setUser(auth.currentUser)
    if (auth.currentUser) {
      setValue(auth.currentUser);
    }
  }, [context.state.user])

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2>Become a subscriber for $9.99/month</h2>
        <CardElement />
        <button type="submit" disable={!stripe}>
          Pay
      </button>
      </form>
    );
  };

export default withFirestore(UserProfile);