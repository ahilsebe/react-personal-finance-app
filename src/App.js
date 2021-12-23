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

   const dataObj = res.data.Data.addressesNetGrowth.sentiment;
   console.log(dataObj);
  //  dataObj = dataObj.toUpperCase();
   setSentiment(dataObj);


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


    let updatedHomeValue = (PV((interestRate/100/12),360,(takeHomePay*0.2*.65/12))
      +(marketValue * (1-.095)) - payoffCost + downPayment) * (1-0.035) ;
    updatedHomeValue = -Math.round(-updatedHomeValue / 1000) * 1000;
    var lowerBoundHomeValue = updatedHomeValue * 0.8 / 1000;
    var upperBoundHomeValue = updatedHomeValue / 1000;
    updatedHomeValue = formatter.format(updatedHomeValue); /* $x,xxx */
    setHomeValue(updatedHomeValue);

    
    console.log(lowerBoundHomeValue);
    

      //dynamic link
    // https://www.redfin.com/zipcode/21237/filter/min-price=100k,max-price=200k
    var link = "https://www.redfin.com/zipcode/" + zipCode
    + "/filter/min-price=" + lowerBoundHomeValue + "k,max-price=" + upperBoundHomeValue+"k";
    document.getElementById('myLink').setAttribute("href",link);
    // document.getElementById('myLink').innerHTML = "Search Redfin";
  
  
  }, [zipCode, takeHomePay, marketValue, payoffCost, downPayment, interestRate])


  return (
    
    <div className="App">
      <body>
        <header>
        <ul>
              <li><a class="current-nav-element" href="#main">Calculator</a></li>
              <li><a class="" href="#sales-db">Sales Database</a></li>
              <li><a class="" href="#crypto-dashboard">Crypto Dashboard</a></li>
              
            </ul>
        </header>
        <div id="main">

          <article id='calculator'>
          <div class="title-section">
            <h1>How Much Home Can You Afford?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
          <div class="content-box">
            <div class="input-form">
              <form>
                <h2>Start Your Home Search with Financial Insight</h2>
                    <div class="question">
                      <label>
                        1. In what zip code are you searching?
                      </label>
                        <input type="number" value={zipCode} onChange={(e)=> setZipCode(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        2. What is your annual gross income?
                      </label>
                        <input type="number" value={takeHomePay} onChange={(e)=> setTakeHomePay(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        3. What is the market value of the home you are selling?
                      </label>
                        <input type="number" value={marketValue} onChange={(e)=> setMarketValue(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        4. What is the payoff cost on the home you are selling?
                      </label>
                        <input type="number" value={payoffCost} onChange={(e)=> setPayoffCost(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        5. How much do you have for a downpayment?
                      </label>
                        <input type="number" value={downPayment} onChange={(e)=> setDownPayment(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        6. What interest rate will you have on your new mortgage?
                      </label>
                        <input type="number" value={interestRate} onChange={(e)=> setInterestRate(parseFloat(e.target.value))}/>
                    
                    </div>
              </form>
            </div>
            <div class="value-return">
              <h2>Home Value</h2>
              <div class="home-value">{homeValue}</div>
              <div class="home-value-text">You can afford a <span>{homeValue}</span> house</div>
              <a id="myLink" href="link" target="_blank"><button>Search Redfin</button></a>
            </div>

          </div>

             
            
                {/* {
            comments && comments.map(comment=>{
              return(
                <div key={comment.id} style={{alignItems:'center',margin:'20px 60px'}}>
                <h4>{comment.name}</h4>
                <p>{comment.email}</p>
              </div>
              )

            })
          } */}



          </article>
          <nav>
            {/* <ul>
              <li>Home</li>
              <li class="current-nav-element">Calculator</li>
              <li>Sales Database</li>
              <li>Dashboard</li>
              
            </ul> */}
          </nav>

        </div>



        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </body>
      <div class="sales-db" id='sales-db'>
            <h1>Sales Database</h1>
            <input placeholder="Enter your name" value={name} 
            onChange={(e) => setName(e.target.value)}/>
            <br/><br/>
            <input placeholder="Enter your age" value={age} 
            onChange={(e) => setAge(e.target.value)}/>
            <br/><br/> 
            <button onClick={Set}>PUSH</button>

      </div>



      <div class="dashboard" id="crypto-dashboard">
      
      <h1>Crypto Dashboard</h1>
        <div class="dashboard-container">

          <div class="dashboard-container-row">
            
        <div class="sales-chart-small">
            <h2>Crytpo Market Sentiment</h2>
            <h1>{ sentiment }</h1>

        </div>
        <div class="sales-chart-small-wide">
            <h2>Commentary</h2>
            <p> - Wen Lambo?</p>
            <p> - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p> - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
       
   
        </div>
            
          </div>

          <div class="dashboard-container-row">
          <div class="sales-chart">
            <h2>ETH Price by the Minute</h2>
            <SalesChart />
        </div>
        <div class="sales-chart">
            <h2>BTC Price by the Minute</h2>
            <BTCChart />
   
        </div>
            
          </div>
        


        </div>
        <h1></h1>


      </div>

    </div>

  );
}

export default App;
