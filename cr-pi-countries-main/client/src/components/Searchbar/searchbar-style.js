import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CreateActivityButton = styled(SearchButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
  margin-left: auto; /* Añadimos margen izquierdo automático para que se alinee a la derecha */
`;
