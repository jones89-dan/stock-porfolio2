import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


class Search extends React.Component {
  state = {
    symbol: '',
    error: '',
    response: {},
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  searchSymbol = (e, symbol) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", symbol);

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
        <form onSubmit={this.searchSymbol}>
            <input name="search" type="text" className="form-control form-control-lg mb-3" placeholder="Search" value={this.symbol} onChange={this.handleChange} required />
            <button type="submit" className="btn btn-danger btn-block btn-lg">Search</button>
            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        {console.log(this.response)}
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
