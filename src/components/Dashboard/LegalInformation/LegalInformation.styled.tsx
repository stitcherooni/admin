import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 24px;
  padding: 0 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    padding: 0;
  }
`;

export const Card = styled.div`
  width: 100%;

  & p {
    margin: 16px 0;
  }

  @media screen and (min-width: 1280px) {
    width: 394px;
  }
`;
