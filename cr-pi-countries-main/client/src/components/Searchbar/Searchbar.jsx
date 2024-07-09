

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCountryByName } from '../../redux/countriesSlice';
import {
  SearchBarContainer,
  Input,
  SearchButton,
  CreateActivityButton,
  ButtonContainer,
} from './searchbar-style';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
  
    try {
      const response = await dispatch(fetchCountryByName(searchTerm.trim()));
      const countryDetails = response.payload;
      console.log(countryDetails);
  
      if (countryDetails && countryDetails.countries.length > 0) {
        navigate(`/countries/${countryDetails.countries[0].id}`);
      } else {
        alert(`No se encontró ningún país con el nombre: ${searchTerm}`);
      }
    } catch (error) {
      console.error('Error searching country:', error);
      alert(`Hubo un error al buscar el país. Inténtelo nuevamente.`);
    }
  };

  const handleShowAllActivities = () => {
    navigate('/activities');
  };

  const handleCreateActivity = () => {
    navigate('/create-activity');
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        placeholder="Buscar un país..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <ButtonContainer>
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
        <CreateActivityButton onClick={handleCreateActivity}>Crear Actividad</CreateActivityButton>
        <CreateActivityButton onClick={handleShowAllActivities}>Ver Todas las Actividades</CreateActivityButton>
      </ButtonContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
