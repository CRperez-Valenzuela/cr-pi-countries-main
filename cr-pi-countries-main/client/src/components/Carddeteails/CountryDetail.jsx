import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryById } from '../../redux/countriesSlice';

import {
  Container,
  CountryHeader,
  CountryName,
  FlagImage,
  DetailItem,
} from './CountryDetail-style';
import {
  HomeButton,
  HomeButtonContainer,
  BackgroundContainer,
} from '../CreateActivity/createactivity-style';

const DetailCountry = () => {
  const { idPais } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const country = useSelector(state => state.countries.selectedCountry);
  const status = useSelector(state => state.countries.status);

  useEffect(() => {
    dispatch(fetchCountryById(idPais));
  }, [dispatch, idPais]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!country) {
    return <div>No se encontró el país.</div>;
  }

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <>
      <BackgroundContainer>
        <HomeButtonContainer>
          <HomeButton onClick={handleGoHome}></HomeButton>
        </HomeButtonContainer>
      </BackgroundContainer>
      <Container>
        <CountryHeader>
          <CountryName>{country.name}</CountryName>
          <FlagImage src={country.flagImage} alt={`${country.name} flag`} />
        </CountryHeader>
        <DetailItem>
          <span>ID:</span> {country.id}
        </DetailItem>
        <DetailItem>
          <span>Continent:</span> {country.continent}
        </DetailItem>
        <DetailItem>
          <span>Capital:</span> {country.capital}
        </DetailItem>
        <DetailItem>
          <span>Population:</span> {country.population}
        </DetailItem>
        <h2>Activities</h2>
        <div>
          {Array.isArray(country.activities) && country.activities.length > 0 ? (
            country.activities.map((activity, index) => (
              <div key={index}>
                <DetailItem>
          <span>Nombre:</span> {activity.name}
                </DetailItem>
                <DetailItem>
          <span>Dificultad:</span> {activity.difficulty} de 5
                </DetailItem>
                <DetailItem>
          <span>Duración:</span> {activity.duration} horas
                </DetailItem>
                <DetailItem>
          <span>Temporada:</span> {activity.season}
                </DetailItem>
                
              </div>
            ))
          ) : (
            <p>No hay actividades turísticas registradas.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default DetailCountry;
