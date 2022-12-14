import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';




const Signup = props => (

    <Layout>
    <div className="text-white">
    <h1>Signup</h1>
      <div className="login-signup col-6">
        <div className="float-right sign-up text-white">
          <form className="p-2 rounded solid">
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
              <button type="submit" id="sign-up-btn" className="btn btn-default btn-danger pull-right">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Signup/>,
    document.body.appendChild(document.createElement('div')),
  )
})
