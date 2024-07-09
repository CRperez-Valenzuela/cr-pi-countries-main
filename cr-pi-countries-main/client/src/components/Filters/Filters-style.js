import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

export const Select = styled.select`
  margin: 0 10px;
  padding: 5px;
`;

export const Button = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;
export const FilterLabel = styled.label`
  margin-bottom: 5px;
`;

export const FilterSelect = styled.select`
  margin-bottom: 10px;
`;