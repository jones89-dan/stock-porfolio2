import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import $ from 'jquery';

const Portfolio = () => {

  const [response, setResponse] = useState([])
  const [search, addSearch] = useState([])
  const [error, setErrorMessage] = useState("")
  const [portfolioSymbol, setPotfolioSymbol] = useState([])
  const querySybmol = location.search.substring(1);
  const [checked, setChecked] = useState(false);


  const getStock = function (event) {
    event.preventDefault();
    var searchSymbol = $('.a-symbol').val();
    console.log(searchSymbol)
    $('.a-symbol').val('');

    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", searchSymbol);

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
        setErrorMessage("No results.")

        console.log(json.data)
      } catch (error) {
          console.log("error", error);
      }
    };
    fetchData();
  }

  const showSearch = (event) => {
      event.preventDefault();
      addSearch(<form className="pt-2" onSubmit={getStock}>
          <input name="search" type="text" className="form-control form-control-lg mb-3 mr-5 ml-5 a-symbol" placeholder="Search" required />
          <button type="submit" className="btn btn-danger btn-block btn-lg">Search</button>
          </form>)
  }

  const addToPortfolio = (symbol) => {
    //event.preventDefault();
    checked ? setChecked(false) : setChecked(true);
    setPotfolioSymbol(symbol);
  }

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={addToPortfolio} />
        {label}
      </label>
      );
    };

  return (
    <Layout>
      <div className="text-white">
        <h1>Portfolio</h1>
          <div className="p-5 text-center search-form">
          <h2>Add to Portfolio</h2>
            <form className="pt-2" onSubmit={getStock}>
                <input name="search" type="text" className="form-control form-control-lg mb-3 mr-5 ml-5 a-symbol" placeholder="Search" required />
                <button type="submit" className="btn btn-danger btn-block btn-lg">Search</button>
            </form>
            <div className="d-flex flex-row text-center">
              <div className="p-2 mt-2 output-text">
                { response.symbol ? <p><a href={'./history?' + response.symbol}>{response.symbol} </a>Current Price: {response.currentPrice}&nbsp;<Checkbox label="Add" value={checked} onChange={addToPortfolio}/></p>
                  : <p className="text-danger mt-2">{error}</p>
                }
              </div>
            </div>
          </div>
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
                      <th scope="row">{}<a href={'./history?'}></a></th>
                        <td scope="col">{}</td>
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
