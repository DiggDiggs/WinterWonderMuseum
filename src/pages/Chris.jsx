import React, { useState, useEffect } from 'react';

const ZenQuotes = () => {
  const [quote, setQuote] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      console.log('Response:', response);
      console.log('Data:', data);

      if (data && data.length > 0) {
        setQuote(data[0].q); // Corrected property to 'q' for the quote
      }
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []); // Empty dependency array to run the effect only once on component mount

  const pageStyle = {
    backgroundColor: '#1a1a1a', // Dark background color
    color: '#ffffff', // White text color
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  };

  const quoteStyle = {
    fontSize: '1.5em',
    marginBottom: '20px',
    maxWidth: '80%', // Limit the width for better readability
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={pageStyle}>
      <div style={quoteStyle}>{quote}</div>
      <button style={buttonStyle} onClick={fetchRandomQuote}>
        Get Another Quote
      </button>
    </div>
  );
};

export default ZenQuotes;
