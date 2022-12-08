import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';

const Portfolio = () => {

  const [apiResponse, setResponse] = useState([])
  const querySybmol = location.search.substring(1);

  const getStock = function () {

    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", querySybmol);

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
        setResponse(json.data);

        console.log(json.data)
      } catch (error) {
          console.log("error", error);
      }
    };
    fetchData();
  }

  return (
    <Layout>
      <div className="text-white">
        <h1>Portfolio</h1>
          <div className="p-5">
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Symbol</th>
                      <th scope="col">Current Price</th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr>
                          <th scope="row"><a href={'./history?'}></a></th>
                          <td scope="col"></td>
                        </tr>
                  </tbody>
                </table>
          </div>
      </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Portfolio />,
    document.body.appendChild(document.createElement('div')),
  )
})
