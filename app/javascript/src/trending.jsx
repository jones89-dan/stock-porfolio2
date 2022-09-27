import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'
//require 'dotenv/load'


class Trending extends React.Component {
  state = {
    stock: {},
    symbol: '',
    data: {},
    currentPrice: '',
    error: '',
  }

  componentDidMount() {
    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", "AAPL");

    const options = {
    	method: 'POST',
    	headers: {
    		'content-type': 'application/x-www-form-urlencoded',
    		'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
    		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
    	},
    	body: encodedParams
    };

    fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
  	 .then(response => response.json())
  	 .then(response => console.log(response))
     .then(response => {
       console.log(response.data.currentPrice)
       this.setState({
         stock: response,
        })
      })
      .catch(err => console.error(err));
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
