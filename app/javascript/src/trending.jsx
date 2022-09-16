import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'


class Trending extends React.Component {
  state = {
    stock: {},
  }

  componentDidMount() {
    getSymbolData("AAPL")
    }

  render () {
    return (
      <Layout>
      <h1>Trending</h1>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Trending />,
    document.body.appendChild(document.createElement('div')),
  )
})
