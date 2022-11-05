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
  const historyArr = []

  const getHistory = function () {
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
        console.log(json.data);
        setResponse(json.data);
        //setHistory(historyArr => [...historyArr, json.data]);
        //const chartData = apiResponse.Open;
        //console.log(apiResponse.Open);
        //createChart(apiResponse.Open);

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

  const createChart = function (historyArr) {
    const history = historyArr;
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red'],
            datasets: [{
                label: 'AAPL',
                //threshold: closeData,
                data: [history],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
  }

  useEffect(() => {
    getHistory();
    //createChart();

  }, []);

  return (
    <Layout>
    <h1>Histroy</h1>
    {apiResponse.map(info => {
      formatDate(info.Date);
      // create an array to pass to chart?
      historyArr.push([info.Open, info.Close])
      //createChart(info.Open, info.Close);
      })
    }
    {
      //console.log(historyArr)
      createChart(historyArr)
    }
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
