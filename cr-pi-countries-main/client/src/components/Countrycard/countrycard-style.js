// src/components/CountryCard/CountryCard.styles.js
import styled from 'styled-components';

export const CountryCardContainer = styled.div`
  border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 240px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
        border-color: #28a745;
    }

    &:active {
        border-color: #218838;
    }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;
