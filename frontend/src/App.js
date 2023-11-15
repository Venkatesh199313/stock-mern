import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [selectedStockname, setStockname] = useState("Reliance");
  const [allStocks, setAllStocks] = useState({});

  const stocknameHandler = (event) => {
    event.preventDefault();
    setStockname(event.target.value);
  }


  //API 
  useEffect(() => {
    const fetchStocks = async () => {
      try {
          const response = await axios.get('http://localhost:5400/getallstocks');
          setAllStocks(response.data);
          console.log('setStockprice', allStocks);
      }catch(err) {
        console.log(err);
      }
    }
    fetchStocks();

    // changing the stockprices
    const interval = setInterval(fetchStocks, 60000);

    return  () => clearInterval(interval);
  }, []);
  return (
    <div className='stock-container'>
      <h1 className='stock-main-heading'>Stock Market</h1>
      <label className='stock-name'>Select your Stock : </label>
      <select className='select-stock' value={selectedStockname} onChange={stocknameHandler} >
        <option value="Reliance">Reliance</option>
        <option value="Adani">Adani</option>
        <option value="Tata Steel">Tata Steel</option>
        <option value="Tata Coffee">Tata Coffee</option>
      </select>
      <div className='price-container'>
        <h1 className='price-name'>Price for {selectedStockname} :</h1>
        <p className='stock-price'>${allStocks[selectedStockname]}</p>
      </div>
    </div>
  )
}

export default App;