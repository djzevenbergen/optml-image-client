
import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import firebase from 'firebase/app';
import { UserContext } from '../userContext';
import MyContext from '../context.js';
import { Jumbotron, Navbar, Nav } from 'react-bootstrap';
import { withFirebase } from 'react-redux-firebase'

import "bootstrap/dist/css/bootstrap.min.css";



const Header = (props) => {
  const { value, setValue } = useContext(UserContext);
  const context = useContext(MyContext);

  const { toggleTheme } = props.theme;

  const navImg = {
    width: "110px",
  };


  const HeaderLogged = styled.h2`
    color: gray;
    font-size: small;
  `;

  const navColor = {
    backgroundColor: props.theme.theme.secondary,
    color: props.theme.theme.white
  }




  const auth = firebase.auth();
  const [user, setUser] = useState(null);

  if (auth.currentUser) {
    setValue(auth.currentUser);
  }
  console.log("hi");
  //dnd end
  useEffect(() => {
    console.log(auth.currentUser)
    // console.log(context.state)
    setUser(auth.currentUser)
  }, [auth.currentUser])



  return (
    <React.Fragment>
      <Navbar style={navColor} variant='dark' expand='lg'>
        <Navbar.Brand><Link className='' to="/home"><img href="" style={navImg} src={props.theme.theme.url} /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto" >

            <Nav.Link> <Link className='navLink1' style={navColor} to="/signin">{user ? "Sign Out" : "Sign in"}</Link></Nav.Link>
            <Nav.Link> <Link className='navLink1' style={navColor} to="/home">Home</Link></Nav.Link>
            <Nav.Link> <Link className='navLink1' style={navColor} to="/upload">{user ? "Optimize Photos" : ""}</Link></Nav.Link>

            <Nav.Link> <Link id="home" className='navLink1' style={navColor} onClick={toggleTheme}>Toggle Visibility</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <HeaderLogged>{user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}</HeaderLogged>
    </React.Fragment>

  );
}

export default Header;