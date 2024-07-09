import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingPageContainer, Heading, Button } from './landingpage-style'; 

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <LandingPageContainer>
      <Heading>Exploremos el Mundo</Heading>
      <Button onClick={() => navigate('/home')}>GO</Button>
    </LandingPageContainer>
  );
};

export default LandingPage;



