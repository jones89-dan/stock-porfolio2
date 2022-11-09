import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import moment from 'moment';
import Chart from 'chart.js/auto';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const History = () => {

  const [startDate, setStartDate] = useState(new Date())
  const [apiResponse, setResponse] = useState([])
  const [history, setHistory] = useState([])
  const testArr = []

  const getHistory = function () {
    const historyArr = [];
    const colorArr = [];
    const encodedParams = new URLSearchParams();
    encodedParams.append("end", "2022-10-20");
    encodedParams.append("symbol", "AAPL");
    encodedParams.append("start", "2022-10-18");

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
        setResponse(json.data);

        // Loop through array of object and collect open/close data
        for (let i = 0; i < json.data.length; i++) {
            if (!json.data[i].hasOwnProperty('Open')) {
        continue;
        }
          historyArr.push([json.data[i].Open, json.data[i].Close]);

          if(json.data[i].Open > json.data[i].Close) {
            colorArr.push('rgba(192, 57, 42)');
          } else {
            colorArr.push('rgba(0,128,0,1)');
          }
        }

      } catch (error) {
          console.log("error", error);
      }

      console.log(historyArr);
      console.log(colorArr);

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['Red', 'Green'],
              datasets: [{
                  barPercentage: 1.0,
                  categoryPercentage: 1.0,
                  label: 'AAPL',
                  data: historyArr,
                  backgroundColor: colorArr,
                  borderColor: colorArr,
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true,
          }
      });

    };
    fetchData();
  }

  const formatDate = function (date) {
    var a = new Date(date * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    console.log(time);
  }

  const buildArr = () => {
    apiResponse.map(info => {setHistory([info.Open, info.Close])})
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Layout>
    <h1>History</h1>
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    <canvas id="myChart" style={{width:"400", height:"400"}}></canvas>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <History />,
    document.body.appendChild(document.createElement('div')),
  )
})
