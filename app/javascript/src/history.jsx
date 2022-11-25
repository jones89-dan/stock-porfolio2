import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import moment from 'moment';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import 'react-dates/initialize';
//import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const History = () => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [apiResponse, setResponse] = useState([])
  const [history, setHistory] = useState([])
  const testArr = []
  const querySybmol = location.search.substring(1);

  // function to format date string
  const formatDate = (aDate) => {
    const yyyy = aDate.getFullYear();
    let mm = aDate.getMonth() + 1; // Months start at 0!
    let dd = aDate.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = yyyy + '-' + mm + '-' + (dd - 1);
    return formattedDate;
  }

  const getHistory = function (startDateVar) {
    // format date for api request
    var currentDate = new Date();
    const endDate = formatDate(currentDate)
    console.log(endDate)

    if (startDateVar == undefined) {
      const today = new Date()
      const lastWeek = new Date(today)
      lastWeek.setDate(lastWeek.getDate() - 7)
      startDateVar = formatDate(lastWeek);
      console.log(startDateVar)
    } else {
      startDateVar = formatDate(startDateVar)
    }

    console.log(querySybmol);
    const historyArr = [];
    const colorArr = [];
    const dateArr = [];
    const encodedParams = new URLSearchParams();
    encodedParams.append("end", endDate);
    encodedParams.append("symbol", querySybmol);
    encodedParams.append("start", startDateVar);

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

        console.log(json.data)
        // Loop through array of object and collect open/close data
        for (let i = 0; i <= json.data.length; i++) {
            if (!json.data[i].hasOwnProperty('Open')) {
        continue;
        }
          historyArr.push([json.data[i].Open.toFixed(2), json.data[i].Close.toFixed(2)]);
          dateArr.push(json.data[i].Date)

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
      console.log(dateArr);

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: dateArr,
              datasets: [{
                  barPercentage: 1.0,
                  categoryPercentage: 1.0,
                  label: querySybmol,
                  data: historyArr,
                  backgroundColor: colorArr,
                  borderColor: colorArr,
                  borderWidth: 1,
                  datalabels: {
                    anchor: 'end',
                    align: 'top',
                  }
              }]
          },
          plugins: [ChartDataLabels],
          options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                }}
          }
      });

    };
    fetchData();
  }

  const getData = (event, start, end) => {
    start = formatDate(start);
    end = formatDate(end)

    console.log(start + " to " + end);

  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Layout>
      <h1>History {querySybmol}</h1>
      <h3>Search A Date Range</h3>
        <div class="d-flex flex-row">
          <div class="p-2">
            <p>Start Date:  </p>
          </div>
          <div class="p-2">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div class="p-2">
            <p>End Date:</p>
          </div>
          <div class="p-2">
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
          </div>
          <div class="p-2">
            <button type="submit" className="btn btn-danger btn-block btn-lg" onClick={event => getData(event, startDate, endDate)}>Search</button>
          </div>
        </div>
      <canvas className="p-5" id="myChart" style={{width:"400", height:"400"}}></canvas>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <History />,
    document.body.appendChild(document.createElement('div')),
  )
})
