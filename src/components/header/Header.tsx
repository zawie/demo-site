import React from 'react';
import { Navbar } from 'react-bootstrap';
import "./Header.css"
import logo from '../../logo.png';
export default function Header() {

    return (
        <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '} Demos <p style={{display: "inline", color: "gray"}}>by Adam Zawierucha</p>
          </Navbar.Brand>
        </Navbar>
      </>
    );
}


