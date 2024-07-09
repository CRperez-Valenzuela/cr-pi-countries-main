import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllActivities } from '../../redux/activitiesSlice';
import { ActivitiesContainer, ActivityCard, ActivityName, Title } from './activities-style';
import {
  HomeButton,
  HomeButtonContainer,
  BackgroundContainer,
} from '../CreateActivity/createactivity-style';

const ActivitiesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook useNavigate
  const activities = useSelector(state => state.activities.activities);
  const status = useSelector(state => state.activities.status);
  const error = useSelector(state => state.activities.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllActivities());
    }
  }, [dispatch, status]);

  const handleGoHome = () => {
    navigate('/home'); 
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Title>Actividades Turísticas</Title>
      <BackgroundContainer>
        <HomeButtonContainer>
          <HomeButton onClick={handleGoHome}></HomeButton>
        </HomeButtonContainer>
      </BackgroundContainer>
      <ActivitiesContainer>
        {activities.map(activity => (
          <ActivityCard key={activity.id}>
            <ActivityName>{activity.name}</ActivityName>
            <p>Dificultad: {activity.difficulty}</p>
            <p>Duración: {activity.duration} horas</p>
            <p>Temporada: {activity.season}</p>
            <p>País: {activity.countryid}</p>
          </ActivityCard>
        ))}
      </ActivitiesContainer>
    </>
  );
};

export default ActivitiesList;
