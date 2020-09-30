import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Button } from 'antd';
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
            />{' '}
            Physics Simulations <p style={{display: "inline", color: "gray"}}>by Zawie</p>
          </Navbar.Brand>
        </Navbar>
      </>
    );
}


