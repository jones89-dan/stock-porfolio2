import React from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';

const Portfolio = props => (

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

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Portfolio />,
    document.body.appendChild(document.createElement('div')),
  )
})
