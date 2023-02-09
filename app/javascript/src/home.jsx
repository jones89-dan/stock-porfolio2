import React, {useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './home.scss';
import Layout from './layout';

const Home = () => {

  const textList = [
    "Welcome to the financial stock app.",
    "See stock data in real time.",
    "View historical data.",
    "Track stocks you've invested in."
  ];

  const [text, setText] = useState("")
  const [fullText, setFullText] = useState(textList[0])
  const [index, setIndex] = useState(0)

  let l = textList.length;

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index])
        setIndex(index + 1)
      }, 100);
    } else {
      setTimeout(() => {
        setFullText(textList[Math.floor(Math.random() * l)]);
        setText("");
        setIndex(0)
      }, 2000);
    }
  }, [index]);

  return (
    <Layout>
      <div id="hero" className="container-fluid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto text-center">
              <div className="hero-text">
                <div className="col p-2 d-inline-block text-white">
                  <div className="glass w-auto p-5">
                   <h1>Stock Portfolio</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-3 bg-dark">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto text-center">
            <div className="col p-2 d-inline-block text-white">
              <div className="w-auto p-2 pb-5 pt-5">
                <p className="type-writer">{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
