import React, { useState, useEffect } from 'react';
import './ExchangeRate.css';

const ExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency}`
        );
        const data = await response.json();
        setExchangeRate(data.ethereum[currency.toLowerCase()]);
      } catch (err) {
        setError('Failed to fetch exchange rate.');
        console.error(err);
      }
    };

    fetchExchangeRate();

    const interval = setInterval(fetchExchangeRate, 60000);
    return () => clearInterval(interval);

  }, [currency]);
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="crew-exchange-rate">
      <div className="crew-rate-display">
        {error ? (
          <div className="crew-error-message">{error}</div>
        ) : (
          <>
            <div className="crew-rate-text">Ethereum Exchange Rate:</div>
            <div className="crew-rate-value">{exchangeRate ? `${exchangeRate} ${currency}` : 'Loading...'}</div>
          </>
        )}
      </div>
      <div className="crew-currency-selector">
        <label htmlFor="currency">Currency:</label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="LKR">LKR</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
  );
};

export default ExchangeRate;
