import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

const CountriesSearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to fetch countries. Please try again later.');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="countries-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {error && <div className="error">{error}</div>}
      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common} className="countryCard">
              <img src={country.flags.png} alt={country.name.common} className="flag-img" />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <div className="no-countries">No countries found</div>
        )}
      </div>
    </div>
  );
};

export default CountriesSearch;