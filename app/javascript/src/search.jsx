import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import $ from 'jquery';
import './home.scss';

class Search extends React.Component {
  state = {
    error: '',
    response: {},
    responseStatus: false,
    symbol: '',
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

    this.setState({
      symbol: searchSymbol
    });

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
          console.log(json);
          this.setState({
            response: json.data,
            responseStatus: json,
          });

          // check for 400 response, set error message.
          if (json.status == 400) {
              this.setState({
                error: "No results.",
              });
          }

          // check for 200 response, set response status.
          if (json.status == 200) {
            console.log("tis 200");
            this.setState({
              responseStatus: true,
            });
          }

        }
        catch (error) {
            console.log("error", error);
            this.setState({
              error: "No results."
            });
            return false;
        }
      }
      fetchData()
    }

    componentDidMount = () => {
      this.setState({
          error: ""
        })
    }

  render () {
    const { symbol, error, response, responseStatus } = this.state;

    return (
      <Layout>
      <div className="text-white">
        <h1>Search</h1>
          <div className="p-5 text-center search-form">
            <form onSubmit={this.searchSymbol}>
                <input name="search" type="text" className="form-control form-control-lg mb-3 mr-5 ml-5 a-symbol" placeholder="Search" required />
                <button type="submit" className="btn btn-danger btn-block btn-lg form-button">Search</button>
            </form>
            <div className="at-container">

                { responseStatus == true ?
                  <div className="p-2 mt-5 output-text output-response at-item">
                    <p className= "p-3"><a  href={'./history?' + symbol}>{symbol} </a>Price: ${response.lastPrice.toFixed(2)}</p>
                  </div>
                : <p className="text-danger mt-2">{error}</p>
                }

            </div>
          </div>
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
