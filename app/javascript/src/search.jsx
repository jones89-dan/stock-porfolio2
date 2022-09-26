import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';


class Search extends React.Component {
  state = {
    symbol: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  searchSymbol = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

  }

  render () {
    const { symbol, error } = this.state;
    return (

      <Layout>
      <h1>Search</h1>
        <form onSubmit={this.searchSymbol}>
            <input name="search" type="text" className="form-control form-control-lg mb-3" placeholder="Search" value={this.symbol} onChange={this.handleChange} required />
            <button type="submit" className="btn btn-danger btn-block btn-lg">Search</button>
            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
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
