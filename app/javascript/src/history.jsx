import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import moment from 'moment'

const History = () => {

  const [apiResponse, setResponse] = useState([])
  const [history, setHistory] = useState([])
  const historyArr = []

  const getHistory = function () {
    const encodedParams = new URLSearchParams();
    encodedParams.append("end", "2022-10-20");
    encodedParams.append("symbol", "AAPL");
    encodedParams.append("start", "2022-10-19");

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
        const response = await fetch('https://yahoo-finance97.p.rapidapi.com/price-customdate', options);
        const json = await response.json();
        console.log(json.data);
        setResponse(json.data);
        setHistory(historyArr => [...historyArr, json.data]);

      } catch (error) {
          console.log("error", error);
      }
    };
    fetchData();
  }

  const formatDate = function (date) {
    const dateString = moment.unix(date).format("MM/DD/YYYY");
    console.log(dateString);

  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Layout>
    <h1>Histroy</h1>
    {apiResponse.map(info => {
      formatDate(info.Date)
    })}
    </Layout>

  )

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <History />,
    document.body.appendChild(document.createElement('div')),
  )
})
