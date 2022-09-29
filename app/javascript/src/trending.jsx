import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'
//require 'dotenv/load'


const Trending = () => {

    const [stockData, setStockData] = useState([])
    const [response, setResponse] = useState([])
    const [symbol, setSybmol] = useState([])
    const [data, setData] = useState([])
    const [currentPrice, setCurrentPrice] = useState([])
    const [error, setError] = useState([])

    const allData = function (response) {
    setStockData(response.stockData.map(data => data));
  };

    useEffect(() => {
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
    	 .then(response => console.log(response.data.currentPrice))
       .then(response => setStockData(response))
       .catch(err => console.error(err));
    }, []);

    return (
      <Layout>
      <h1>Trending</h1>
          {stockData && stockData.map(data => {
            return (
              <div key={data.data}>
                <p>{data.data}</p>
              </div> )
            })}
      </Layout>
    )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Trending />,
    document.body.appendChild(document.createElement('div')),
  )
})
