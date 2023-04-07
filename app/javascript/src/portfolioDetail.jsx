mport React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout';
import './home.scss';
import { handleErrors } from 'src/utils/fetchHelper';
import { getSymbolData } from 'src/utils/requests'

const PortfolioDetail = () => {


    return (
      <Layout>
        <div className="text-white">
          <h1>PortfolioDetail</h1>

        </div>
      </Layout>
    )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PortfolioDetail />,
    document.body.appendChild(document.createElement('div')),
  )
})
