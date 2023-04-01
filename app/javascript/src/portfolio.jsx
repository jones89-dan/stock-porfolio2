import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import { addToPortfolio, index, getCurrentUser, getTrending } from './utils/requests'
import $ from 'jquery';

const Portfolio = () => {

  const [response, setResponse] = useState([])
  const [search, addSearch] = useState([])
  const [error, setErrorMessage] = useState("")
  const [portfolioSymbol, setPotfolioSymbol] = useState([])
  const querySybmol = location.search.substring(1)
  const [checked, setChecked] = useState(false)
  const [symbol, setSymbol] = useState("")
  const [responseStatus, setResponseStatus] = useState(false)
  const [portfolios, setPortfolio] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPrices, setCurrentPrices] = useState([]);

  const allStocks = function (response) {
    setPortfolio(response.symbols.map(symbol => symbol));
  };


  const getStock = function (event) {
    event.preventDefault();
    var searchSymbol = $('.a-symbol').val();
    console.log(searchSymbol);
    $('.a-symbol').val('');
    setSymbol(searchSymbol);

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
        const response = await fetch('https://yahoo-finance97.p.rapidapi.com/simple-info', options);
        const json = await response.json();
        setResponse(json.data);
        //setErrorMessage("No results.")

        // check for 400 response, set error message.
        if (json.status == 400) {
            setErrorMessage("No results.")
            return;
        }

        // check for 200 response, set response status.
        if (json.status == 200) {
          console.log("tis 200");
          setResponseStatus(true)
        }

        console.log(json.data)

        // Loop through array of object and collect open/close data
        for (let i = 0; i <= json.data.length; i++) {
            if (!json.data[i].hasOwnProperty('symbol')) {
          console.log(false)
        }
          console.log(true)
        }

      } catch (error) {
          console.log("error", error);
          setErrorMessage("No results.");
          return false;
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

  const insertToPortfolio = function (event) {
    event.preventDefault();
    console.log(symbol);
    addToPortfolio(symbol, function (response) {
      if (response.success == false) {
        console.log(response.error)
      }
      else{
        console.log("success")
      }
    });
    return
  }

  useEffect(() => {
    getCurrentUser(function (response) {
      console.log(response.username)
      //setCurrentUser(response.username);
      index(response.username, allStocks);
      //portfolios.forEach((item, index) => getTrending(item))
      console.log(getTrending('aapl'))
    });
    //index(currentUser, allStocks);
  }, []);

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
                <button type="submit" className="btn btn-danger btn-block btn-lg form-button">Search</button>
            </form>
            <div className="">
                { responseStatus == true  ?
                  <div className="p-2 mt-5 text-center output-response">
                    <p className="p-3"><a href={'./history?' + symbol}>{symbol} </a>Price: ${response.lastPrice.toFixed(2)}&nbsp;</p>
                      <form onSubmit={insertToPortfolio}>
                        <button type="submit">Add to Portfolio</button>
                      </form>
                  </div>
                  : <p className="text-danger mt-2">{error}</p>
                }
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
                  {portfolios.map((portfolio, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row"><a href={'./history?' + portfolio.symbol}>{portfolio.symbol}</a></th>
                        <td scope="col">{}</td>
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
    <Portfolio />,
    document.body.appendChild(document.createElement('div')),
  )
})
