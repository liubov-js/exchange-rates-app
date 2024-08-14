import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [valueEur, setValueEur] = useState();
  const [valueUsd, setValueUsd] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  async function fetchExchangeRate() {
    try {
      const response = await axios.get('https://api.exchangeratesapi.io/v1/latest?access_key=9e32ac6bdc8863afeb381e5529077b60&base=EUR&symbols=USD');
      setExchangeRate(response.data.rates.USD);
      setError(null);
    } catch(e) {
      setError('Faild fetching currency rates. Please try again later.');
    }
  }

  function handleEurChange(e) {
    setValueEur(e.target.value);
    setValueUsd(Number((e.target.value * exchangeRate).toFixed(2)));
  }

  function handleUsdChange(e) {
    setValueUsd(e.target.value);
    setValueEur(Number((e.target.value / exchangeRate).toFixed(2)));
  }

  function handleKeyDown(e) {
    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
      e.preventDefault();
    }
  }

  return (
    <div className='app'>
      <h1>Exchange Rates</h1>
      {error && <p className='error'>{error}</p>}
      <div className='exchange-rate'>1 EUR = {exchangeRate.toFixed(2)} USD</div>
      <div>
        <input 
          type='number' 
          disabled={error} 
          value={valueEur} 
          onChange={e => handleEurChange(e)} 
          onKeyDown={handleKeyDown} 
        /> EUR 
      </div>
      <div>
        <input 
          type='number' 
          disabled={error} 
          value={valueUsd} 
          onChange={e => handleUsdChange(e)} 
          onKeyDown={handleKeyDown} 
        /> USD
      </div>
    </div>
  );
}

export default App;
