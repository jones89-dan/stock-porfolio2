import React, { useEffect, useState } from 'react';
import './layout.scss';
import image from './images/stock1.png';
import { logOutUser, getCurrentUser } from './utils/requests';

const Layout = (props) => {

  const [currentUser, setCurrentUser] = useState("");

  const handleLogout = function () {
    getCurrentUser(function (response) {
      setCurrentUser(response.username);
      console.log(currentUser)
    })

    logOutUser(function (response) {
      if (response.success == true) {
        window.location.replace('/');
      };
    });
  };



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
                  <a className="nav-link" href="/portfolio">Portfolio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/search">Search</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signup">Signup</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleLogout}>Logout</a>
               </li>
              </ul>
            </div>
        </div>
      </nav>
      <div>
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
