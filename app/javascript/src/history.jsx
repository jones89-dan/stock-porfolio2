import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


const History = props => (

    <Layout>
    <h1>Histroy</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <History />,
    document.body.appendChild(document.createElement('div')),
  )
})
