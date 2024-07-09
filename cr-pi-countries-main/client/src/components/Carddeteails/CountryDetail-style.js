import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CountryHeader = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const CountryName = styled.h2`
  font-size: 24px;
`;

export const FlagImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const DetailItem = styled.p`
  margin-bottom: 10px;

  span {
    font-weight: bold;
  }
`;



export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CountryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MoreDetails = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const DetailValue = styled.span`
  margin-left: 10px;
`;
export const activityContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
`;
export const activityDetails = styled.div`
margin-top: 20px;
  font-size: 16px;
`;