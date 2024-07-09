import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setCurrentPage } from '../../redux/countriesSlice';
import CountryCard from '../Countrycard/CountryCard';
import SearchBar from '../Searchbar/Searchbar';
import FilterComponent from '../Filters/Filters';
import SortComponent from '../Sorting/Sorting';
import {
  HomePageContainer,
  CountryGrid,
  PaginationContainer,
  PaginationButton
} from './home-style';

const HomePage = () => {
  const dispatch = useDispatch();
  const filteredCountries = useSelector((state) => state.countries.filteredCountries);
  const countriesPerPage = useSelector((state) => state.countries.countriesPerPage);
  const currentPage = useSelector((state) => state.countries.currentPage);
  const totalCountries = useSelector((state) => state.countries.countries.length);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const totalPages = Math.ceil(totalCountries / countriesPerPage);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const visibleCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <HomePageContainer>
      <SearchBar />
      <FilterComponent />
      <SortComponent />
      <CountryGrid>
        {visibleCountries.map(country => (
          <CountryCard key={country.id} country={country} />
        ))}
      </CountryGrid>
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </PaginationButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
          >
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </PaginationButton>
      </PaginationContainer>
    </HomePageContainer>
  );
};

export default HomePage;
