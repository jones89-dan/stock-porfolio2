import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


const Home = props => (

    <Layout>
    <h1>Home</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
