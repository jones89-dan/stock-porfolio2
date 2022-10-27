import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import moment from 'moment';
import Chart from 'chart.js/auto';

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
    //const dateString = moment.unix(date).format("MM/DD/YYYY");
    //var dateFormatted = new Date(date*1000);
    var a = new Date(date * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    console.log(time);
  }

  const createChart = function () {

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

  useEffect(() => {
    getHistory();
    createChart();
  }, []);

  return (
    <Layout>
    <h1>Histroy</h1>
    {apiResponse.map(info => {
      formatDate(info.Date)
    })}
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
