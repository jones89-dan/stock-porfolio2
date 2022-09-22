import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


const Portfolio = props => (

    <Layout>
    <h1>Portfolio</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Portfolio />,
    document.body.appendChild(document.createElement('div')),
  )
})
