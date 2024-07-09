import styled from 'styled-components';

export const ActivitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export const ActivityCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  text-align: center;
`;

export const ActivityName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
`;
