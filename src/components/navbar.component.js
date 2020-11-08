import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
export default class Navbarr extends Component {
  render() {
    return (
      <Navbar fixed="top" bg="primary" variant="dark">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
      </Navbar>
    );
  }
}
