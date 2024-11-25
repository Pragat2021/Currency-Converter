import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

   const apiKey = '6e4c253e5e2646098f7323ed'; // Api Key is here
   const API_URL = ` https://v6.exchangerate-api.com/v6/6e4c253e5e2646098f7323ed/latest/USD`; // url is here

// First dowmload Axioms then try to use axioms
  
  useEffect(() => {
    axios.get( `https://v6.exchangerate-api.com/v6/6e4c253e5e2646098f7323ed/latest/USD`)
      .then(response => {
        const rate = response.data.conversion_rates[toCurrency];
        setExchangeRate(rate);
        setCurrencyOptions([...Object.keys(response.data.conversion_rates)]);
      })
      .catch(error => console.error(error));
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const convertCurrency = () => {
    if (amountInFromCurrency) {
      // setAmountInFromCurrency(true);
      return amount * exchangeRate;
    }
    return amount / exchangeRate;
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input type="number" value={amount} onChange={handleAmountChange} />
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          {currencyOptions.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span>=</span>
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {currencyOptions.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <h2>{convertCurrency()} {toCurrency}</h2>
      </div>
    </div>
  );
}

export default App;
