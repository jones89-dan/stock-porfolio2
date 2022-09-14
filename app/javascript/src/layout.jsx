import React, { useEffect, useState } from 'react';
import './layout.scss';

const Layout = (props) => {

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href='/'></a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/trending">Trending</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Portfolio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Search</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">Signup</a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
      <div className="no-left container py-3 mb-5">
        {props.children}
      </div>
      <footer className="fixed-bottom p-3 bg-dark">
        <div className="container">
          <span className="me-3 text-secondary">Built by <a href="https://github.com/jones89-dan">jones89-Dan</a> with ☕ &nbsp;and ⚔️ </span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
