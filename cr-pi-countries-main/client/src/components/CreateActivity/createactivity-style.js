import styled from 'styled-components';
import Homeimage from '../../images/test.png';
import Select from "react-select";

export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 `;

export const HomeButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  background-color: none;
`;

export const HomeButton = styled.button`
  width: 100px;
  height: 100px;
  background-image: url(${Homeimage});
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;

  &:hover::after {
    content: 'Regresar al home';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    z-index: 1;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 5;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  z-index: 5;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
`;
export const styledSeasons = styled.select`
height: 40px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled ? '#ccc' : '#28a745'};
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#218838'};
  }
`;

export const Error = styled.div`
  color: red;
  margin-bottom: 20px;
`;

export const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;
export const StyledSelect = styled(Select)`
  .Select__control {
    height: 40px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #3c3d3e;
  }
`;

