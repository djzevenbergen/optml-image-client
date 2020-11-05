import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from 'react-stripe-elements';
import '../index.css';
import firebase from "firebase/app";
import { withFirestore, useFirestore } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UserContext } from '../userContext';
import { MyContext } from "../context.js";
import Button from 'react-bootstrap/Button';
import { Jumbotron, Navbar, Nav, Col, } from 'react-bootstrap';
import axios from "axios";

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

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async event => {
  //   event.preventDefault();

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement)
    // });

    // if (!error) {
    //   const { id } = paymentMethod;

    //   try {
    //     const { data } = await axios.post("/api/charge", {id, amount: 999});  // represents $9.99
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  // };



//   new Card({
//     form: 'form',
//     container: '.card',
//     formSelectors: {
//       numberInput: 'input[name=number]',
//       expiryInput: 'input[name=expiry]',
//       cvcInput: 'input[name=cvv]',
//       nameInput: 'input[name=name]'
//     },

//     width: 390, // optional — default 350px
//     formatting: true,

//     placeholders: {
//       number: '•••• •••• •••• ••••',
//       name: 'Full Name',
//       expiry: '••/••',
//       cvc: '•••'
//     }
// })


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

        <h1>Become a Subscriber</h1>
        <form  action="#">  {/* may need to add an onSubmit */}

          <div class="container-fluid grid">

            <div class="row pull-center">
              <div class="col-md-4">
                <div class="well">

                  <div class="row card">
                  </div>

                  <br />

                  <div class="row-fluid">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label>Credit Card Number </label>
                        <input type="text" name="number" class="form-control" />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Expiration</label>
                        <input type="text" placeholder="MM/YY" name="expiry" class="form-control" />
                      </div>
                    </div>
                  </div>

                  <div class="row-fluid">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" class="form-control" />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>CVV </label>
                        <input type="text" name="cvv" class="form-control" />
                      </div>
                    </div>
                  </div>

                  <div class="row ">
                    <div class="col-md-12 text-right">
                      <button type="button" class="btn btn-success">Submit</button>
                      <button type="button" class="btn btn-info">Clear</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {console.log("screech")}
    </React.Fragment>
  );
}

export default withFirestore(UserProfile);