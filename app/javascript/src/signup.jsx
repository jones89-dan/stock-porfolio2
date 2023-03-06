import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import $ from 'jquery';
import { createUser, signInUser, authenticate } from './utils/requests'

const Signup = () => {

  // Crete user on form submission
  const handleFormSubmission = (event) => {
    event.preventDefault();

    var userName = $('.username').val();
    var userEmail = $('.email').val();
    var userPassword = $('.password').val();

    createUser(userName, userEmail, userPassword, function (response) {

      if (response.success == false) {
        console.log(response.error);
      }
      else {
        console.log('User ' + userName + ' signed up');
        signInUser(userName, userPassword, function(){
          authenRedirect();
        });
      }
    });
  }

  // Login the user on form submit
  const login = (event) => {
    event.preventDefault();

    var userName = $('.username').val();
    var userPassword = $('.password').val();

    signInUser(userName, userPassword, function (response) {
       authenRedirect();
      if (response.success == false) {
        console.log(response.error);
      }
      else {
        console.log('User ' + userName + ' signed in')
        authenRedirect();
      }
    });
  }

  function authenRedirect() {
    authenticate(function(response) {
      if(response.authenticated) {
        window.location.replace("/portfolio");
      }
    });
  };

  return (
    <Layout>
    <div className="text-white">
    <h1>Signup/Login</h1>
      <div className="login-signup col-6">
        <div className="float-right sign-up text-white">
          <form className="p-2 rounded solid" onSubmit={handleFormSubmission}>
            <div className="new-to-t">
              <p className="text-white pt-3"><span> Sign Up</span></p>
            </div>
            <div className="form-group">
              <input type="text" className="form-control username" placeholder="Username"/>
            </div>
            <div className="form-group">
              <input type="email"className="form-control email" placeholder="Email"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control password" placeholder="Password"/>
            </div>
              <button type="submit" id="sign-up-btn" className="btn btn-default btn-danger pull-right">Sign Up</button>
            </form>
          </div>
        </div>
          <div className="login-signup login pt-3 col-6 mb-6">
            <div className="float-right sign-up text-white">
              <form className="p-2 rounded solid" onSubmit={login}>
                <div className="new-to-t">
                  <p className="text-white pt-3"><span>Log In</span></p>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control username" placeholder="Username"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control password" placeholder="Password"/>
                </div>
                  <button type="submit" id="sign-up-btn" className="btn btn-default btn-danger pull-right">Log In</button>
                </form>
              </div>
            </div>
      </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Signup/>,
    document.body.appendChild(document.createElement('div')),
  )
})
