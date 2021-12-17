import './App.css';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';
// import BarChart from './components/BarChart';
import SalesChart from './components/Sales'


function App() {

  const initialHomeValue = Number(localStorage.getItem("homeValue") || 100000);
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


  //api test
  const [comments,setComments]=useState([])

  const fetchComments=async()=>{
    const response=await Axios('https://jsonplaceholder.typicode.com/comments');
    setComments(response.data)    
  }


  useEffect(() => {
    localStorage.setItem("homeValue", homeValue);
    localStorage.setItem("zipCode", zipCode);
    localStorage.setItem("takeHomePay", takeHomePay);
    localStorage.setItem("marketValue", marketValue);
    localStorage.setItem("payoffCost", payoffCost);
    localStorage.setItem("downPayment", downPayment);
    localStorage.setItem("interestRate", interestRate);
    fetchComments();


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
    let updatedHomeValue = takeHomePay * 2;
    updatedHomeValue = formatter.format(updatedHomeValue); /* $x,xxx */
    setHomeValue(updatedHomeValue);
  
  }, [zipCode, takeHomePay, marketValue, payoffCost, downPayment, interestRate])


  return (
    
    <div className="App">
      <body>
        <header></header>
        <div id="main">

          <article>
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
                        2. What is your monthly income after taxes?
                      </label>
                        <input type="number" value={takeHomePay} onChange={(e)=> setTakeHomePay(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        3. What is the market value of the home you are selling?
                      </label>
                        <input type="number" value={zipCode} onChange={(e)=> setZipCode(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        4. What is the payoff cost on the home you are selling?
                      </label>
                        <input type="number" value={zipCode} onChange={(e)=> setZipCode(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        5. How much do you have for a downpayment?
                      </label>
                        <input type="number" value={zipCode} onChange={(e)=> setZipCode(parseInt(e.target.value))}/>
                    </div>

                    <div class="question">
                      <label>
                        6. What interest rate will you have on your new mortgage?
                      </label>
                        <input type="number" value={zipCode} onChange={(e)=> setZipCode(parseInt(e.target.value))}/>
                    
                    </div>
              </form>
            </div>
            <div class="value-return">
              <h2>Home Value</h2>
              <div class="home-value">{homeValue}</div>
              <div class="home-value-text">You can afford a <span>{homeValue}</span> house</div>
              <h3>Historical Mortgage Rates</h3>
              <div class="sales-chart">
                <SalesChart />
              </div>
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
            <ul>
              <li>
                <span>  -  </span>
                <span>Title</span>
              </li>
              <li>Home</li>
              <li>Dashboard</li>
              <li>Analysis</li>
              <li class="current-nav-element">Calculator</li>
            </ul>
          </nav>
          <aside></aside>
        </div>
        <footer></footer>


        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </body>
    </div>
  );
}

export default App;
