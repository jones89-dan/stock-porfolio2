import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'

const Trending = () => {

    const [stockData, setStockData] = useState([])
    const [apiResponse, setResponse] = useState({})
    const [symbol, setSybmol] = useState([])
    const [data, setData] = useState([])
    const [currentPrice, setCurrentPrice] = useState([])
    const [error, setError] = useState([])
    const [trending, setTrending] = useState([])
    const trendingArr = []

    const getTrending = function (aSymbol) {
      const encodedParams = new URLSearchParams();
      encodedParams.append("symbol", aSymbol);

      const options = {
      	method: 'POST',
      	headers: {
      		'content-type': 'application/x-www-form-urlencoded',
      		'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
      		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
      	},
      	body: encodedParams
      };

      const fetchData = async() => {
        try {
          const response = await fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options);
          const json = await response.json();
          console.log(json);
          setTrending(trendingArr => [...trendingArr, json.data]);

        } catch (error) {
            console.log("error", error);
        }
      };
      fetchData();
    }

    useEffect(() => {

      const topARR = ["AAPL", "MSFT", "AMZN", "TSLA", "GOOG", "GOOGL", "META", "NVDA"]
      topARR.forEach((item, index) => getTrending(item))

    }, []);

    return (
      <Layout>
        <h1>Trending</h1>
              <div>
                {trending.map(data => {
                  return (
                    <div key={data.symbol}>
                      <p>{data.symbol} Current Price: {data.currentPrice}</p>
                    </div>
                  )
                })}
              </div>
      </Layout>
    )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Trending />,
    document.body.appendChild(document.createElement('div')),
  )
})
