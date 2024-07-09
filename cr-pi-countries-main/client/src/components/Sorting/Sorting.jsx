import React from 'react';
import { useDispatch } from 'react-redux';
import { sortByName, sortByPopulation } from '../../redux/countriesSlice';
import { SortContainer, Button } from './Sorting-style';

const SortComponent = () => {
  const dispatch = useDispatch();

  return (
    <SortContainer>
      <Button onClick={() => dispatch(sortByName('asc'))}>Ordenar por Nombre (Asc)</Button>
      <Button onClick={() => dispatch(sortByName('desc'))}>Ordenar por Nombre (Desc)</Button>
      <Button onClick={() => dispatch(sortByPopulation('asc'))}>Ordenar por Población (Asc)</Button>
      <Button onClick={() => dispatch(sortByPopulation('desc'))}>Ordenar por Población (Desc)</Button>
    </SortContainer>
  );
};

export default SortComponent;
