import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';




const Signup = props => (

    <Layout>
    <h1>Signup</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Signup/>,
    document.body.appendChild(document.createElement('div')),
  )
})
