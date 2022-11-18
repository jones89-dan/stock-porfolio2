import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';
import moment from 'moment';
import Chart from 'chart.js/auto';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const History = () => {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
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

  const onDatesChange = ({ startDate}) => setStartDate({ startDate})


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
          historyArr.push([json.data[i].Open, json.data[i].Close]);
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
                  borderWidth: 1
              }]
          },
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

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Layout>
    <h1>History {querySybmol}</h1>
    <DateRangePicker
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate })} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
    />

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
