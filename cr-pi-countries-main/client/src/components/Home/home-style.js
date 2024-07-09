import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); // 5 columnas por fila
  gap: 20px; // Espacio entre las tarjetas
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? '#007bff' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;
