import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import $ from 'jquery';
import './home.scss';

class Search extends React.Component {
  state = {
    error: '',
    response: {},
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  searchSymbol = (event) => {
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
          console.log(json.data);
          this.setState({
            response: json.data,
          });

        } catch (error) {
            console.log("error", error);
        }
      }
      fetchData()
    }

  render () {
    const { symbol, error, response } = this.state;

    return (
      <Layout>
      <h1>Search</h1>
        <div className="p-5">
          <form onSubmit={this.searchSymbol}>
              <input name="search" type="text" className="form-control form-control-lg mb-3 a-symbol" placeholder="Search" required />
              <button type="submit" className="btn btn-danger btn-block btn-lg">Search</button>
              {error && <p className="text-danger mt-2">{error}</p>}
          </form>
          {
            <p>{response.symbol} Current Price: {response.currentPrice}</p>
          }
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Search />,
    document.body.appendChild(document.createElement('div')),
  )
})
