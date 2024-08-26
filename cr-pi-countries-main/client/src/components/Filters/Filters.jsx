import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByContinent, filterByActivity } from '../../redux/countriesSlice';
import { FilterContainer, Select } from './Filters-style';

const FilterComponent = () => {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.countries.activities); // Obtener actividades del estado

  const handleContinentChange = (e) => {
    dispatch(filterByContinent(e.target.value));
  };

  const handleActivityChange = (e) => {
    dispatch(filterByActivity(e.target.value));
  };

  return (
    <FilterContainer>
      <Select onChange={handleContinentChange}>
        <option value="">Selecciona un Continente</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </Select>
      
    </FilterContainer>
  );
};

export default FilterComponent;
