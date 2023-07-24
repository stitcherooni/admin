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

  & .button-wrapper {
    display: flex;
    justify-content: center;
    gap: 16px;
    min-height: 42px;
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
  height: 453px;
  padding: 45px 20px 64px 20px;
  background-color: ${(props) => props.theme.colors.main.white}; 
  box-shadow: 2px 2px 24px rgba(122, 81, 145, 0.32);
  border-radius: 16px;
  margin-bottom: 16px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 14px;
  overflow: hidden;
  
  & img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 16px auto;
  }

  & p {
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.main.black};  
  }

  & a {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.main.purple};  
  }
`;
