import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar2 = ({ user }) => {
  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <a className="navbar-brand">
            <span>
            Welcome, {user}!
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/Home">Home</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/contacts">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddProduct">Add Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign-up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
              <div className="user_option">
                <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                  <button className="btn my-2 my-sm-0 nav_search-btn" type="submit"></button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar2;
