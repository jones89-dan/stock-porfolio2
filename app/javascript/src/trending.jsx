import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'

const Trending = () => {

    const [error, setError] = useState([])
    const [trending, setTrending] = useState([])
    const trendingArr = []
    const earningGrowth = document.getElementById("eGrowth");
    const [symbol, setSymbol] = useState("")
    const [id, incrementId] = useState(0);

    const getTrending = function (aSymbol) {
      const encodedParams = new URLSearchParams();
      encodedParams.append("symbol", aSymbol);
      setSymbol(aSymbol);

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
          const response = await fetch('https://yahoo-finance97.p.rapidapi.com/simple-info', options);
          const json = await response.json();
          console.log(json.data);
          json.data ["symbol"] = aSymbol
          json.data ["uniqueId"] = incrementId(id + 1)
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
        <div className="text-white">
          <h1>Trending</h1>
                <div className="p-5">
                      <table className="table table-dark table-hover rounded">
                        <thead>
                          <tr>
                            <th scope="col">Symbol</th>
                            <th scope="col">Current Ask Price</th>
                            <th scope="col">Daily High</th>
                            <th scope="col">Daily Low</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trending.map((data, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row"><a href={'./history?' + data.symbol}>{data.symbol}</a></th>
                                <td scope="col">${data.lastPrice.toFixed(2)}</td>
                                <td scope="col">${data.dayHigh.toFixed(2)}</td>
                                <td scope="col">${data.dayLow.toFixed(2)}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                </div>
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
