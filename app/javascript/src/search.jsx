import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


const Search = props => (

    <Layout>
    <h1>Search</h1>
    </Layout>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Search />,
    document.body.appendChild(document.createElement('div')),
  )
})
