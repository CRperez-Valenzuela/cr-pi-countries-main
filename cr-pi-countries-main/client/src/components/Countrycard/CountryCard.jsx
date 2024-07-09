import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CountryCardContainer } from './countrycard-style';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/countries/${country.id}`);
    
  };

  return (
    <CountryCardContainer onClick={handleCardClick}>
      <img src={country.flagImage} alt={`${country.name} flag`} />
      <h3>{country.name}</h3>
      <p>{country.continent}</p>
    </CountryCardContainer>
  );
};

export default CountryCard;
