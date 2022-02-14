// array to json for house chart

//moving states comparison tax tool
  //state and local income tax, property tax, sales tax



// git remote -v
// git add .
// git commit -m "My first commit"
// git push


import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import BarChart from './components/BarChart';
import SalesChart from './components/EthChart'
import BTCChart from './components/BTCChart'

import database from './firebase';
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { CounterRef } from '@amcharts/amcharts5/.internal/core/util/Counter';
import { net } from '@amcharts/amcharts4/core';
import { BarChart } from 'recharts';

function App() {

  //firebase
  const [name , setName] = useState([]);
  const [age, setAge] = useState([]);

  const initialHomeValue = Number(localStorage.getItem("homeValue") || 0);
  const initialZipCode = Number(localStorage.getItem("zipCode") || 90210);
  const initialTakeHomePay = Number(localStorage.getItem("takeHomePay") || 0);
  const initialMarketValue = Number(localStorage.getItem("marketValue") || 0);
  const initialPayoffCost = Number(localStorage.getItem("payoffCost") || 0);
  const initialDownPayment = Number(localStorage.getItem("downPayment") || 0);
  const initialInterestRate = Number(localStorage.getItem("interestRate") || 3.5);
  
  const [homeValue, setHomeValue] = useState(initialHomeValue);
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [takeHomePay, setTakeHomePay] = useState(initialTakeHomePay);
  const [marketValue, setMarketValue] = useState(initialMarketValue);
  const [payoffCost, setPayoffCost] = useState(initialPayoffCost);
  const [downPayment, setDownPayment] = useState(initialDownPayment);
  const [interestRate, setInterestRate] = useState(initialInterestRate);

  const initialSentiment = "";
  const [sentiment, setSentiment] = useState(initialSentiment);
  
// //trading sentiment api
//  //get api data
 axios
 // .get("http://dummy.restapiexample.com/api/v1/employees")
 .get("https://min-api.cryptocompare.com/data/tradingsignals/intotheblock/latest?fsym=BTC&api_key={e6a54e3b9523cbc86de7aaec8faeea1c198adfd5ce0505318ec00b9fdf86e142}")
 .then(res => {

   const dataObj = res.data.Data.addressesNetGrowth.score;
   console.log(dataObj);
  //  dataObj = dataObj.toUpperCase();
   setSentiment(Math.round(dataObj * 100));

 })
 .catch(err => {
   console.log(err);
 })

//database
    const db = getDatabase();
    set(ref(db), {
      username: name,
      age: age,
    });

  // //api test
  // const [comments,setComments]=useState([])

  // const fetchComments=async()=>{
  //   const response=await Axios('https://jsonplaceholder.typicode.com/comments');
  //   setComments(response.data)    
  // }

  useEffect(() => {
    localStorage.setItem("homeValue", homeValue);
    localStorage.setItem("zipCode", zipCode);
    localStorage.setItem("takeHomePay", takeHomePay);
    localStorage.setItem("marketValue", marketValue);
    localStorage.setItem("payoffCost", payoffCost);
    localStorage.setItem("downPayment", downPayment);
    localStorage.setItem("interestRate", interestRate);
    // fetchComments();

    //currency format
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    
      // These options are needed to round to whole numbers if that's what you want.
      //, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    
    //calcs
    function PV(rate, nper, pmt)
    {
        return pmt / rate * (1 - Math.pow(1 + rate, -nper));
    }

    let updatedHomeValue = (PV((interestRate/100/12),360,(takeHomePay*0.25*.60/12))
      +(marketValue * (1-.09)) - payoffCost + downPayment) * (1-0.035) ;
    updatedHomeValue = -Math.round(-updatedHomeValue / 1000) * 1000;
    var lowerBoundHomeValue = updatedHomeValue * 0.8 / 1000;
    var upperBoundHomeValue = updatedHomeValue / 1000;
    updatedHomeValue = formatter.format(updatedHomeValue); /* $x,xxx */
    setHomeValue(updatedHomeValue);

    // //dynamic link
    // var link = "https://www.redfin.com/zipcode/" + zipCode
    // + "/filter/min-price=" + lowerBoundHomeValue + "k,max-price=" + upperBoundHomeValue+"k";
    // document.getElementById('myLink').setAttribute("href",link);

  }, [zipCode, takeHomePay, marketValue, payoffCost, downPayment, interestRate])


  return (
    
    <div className="App">
      <div className="valentine">
        <div className="top">
          <h1 className="valentine-1">Happy</h1>
          <h1 className="valentine-2">Valentine's</h1>
          <h1 className="valentine-3">Day,</h1>
          <h1 className="valentine-4">Content!</h1>
        </div>
        <div  className="middle">
        <img src="https://cdn-icons-png.flaticon.com/512/6774/6774468.png" width = "300"/>
        </div>
        <div className="bottom">
          <p>Love,</p>
          <p>Andrew & Mango</p>
        </div>
      </div>

       
     
    </div>

  );
}

export default App;
