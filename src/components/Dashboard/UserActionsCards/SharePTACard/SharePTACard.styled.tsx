import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: 1280px) {
    width: 394px;
  }
`;

export const CardWrapper = styled.div`
  max-width: 394px;
  margin: 0 auto;

  & .pta-button-wrapper {
    display: flex;
    justify-content: flex-start;
  }
`;

export const Caption = styled.p`
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.main.black};
  font-size: 16px;
  line-height: 130%;
  background-color: transparent;
  margin-bottom: 16px;
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.main.white}; 
  box-shadow: 2px 2px 24px rgba(122, 81, 145, 0.32);
  border-radius: 16px; 
`;

export const ShareCard = styled(Card)`
  padding: 16px 0;
  margin-bottom: 16px;
  text-align: center;

  & .button-wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 340px;
    margin: 0 auto;

    & img {
      padding: 10.43px 9px;
    }
  }
  
  & .qr-code {
    max-width: 100%;
    height: auto;
    margin: 16px auto;
    display: block;
  }

  & a {
    font-family: ${(props) => props.theme.fonts.mainFont};
    color: ${(props) => props.theme.colors.main.black};
    font-size: 14px;
    line-height: 16px;
  }

  @media screen and (min-width: 1280px) {
    padding: 16px 25.5px;
  }
`;
