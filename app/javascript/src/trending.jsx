import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';




const Home = props => (

    <Layout>
    <h1>Trending</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
