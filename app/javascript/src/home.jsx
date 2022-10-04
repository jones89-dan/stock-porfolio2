import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


const Home = props => (

    <Layout>
    <div id="hero" className="container-fluid">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto text-center">
            <div className="hero-text">
              <div className="col p-2 d-inline-block text-white">
                <div className="glass w-auto p-5">
                 <h1>Stock Portfolio</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
