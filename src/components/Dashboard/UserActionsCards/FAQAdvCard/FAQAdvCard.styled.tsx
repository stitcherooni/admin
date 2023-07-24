import styled from 'styled-components';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';

export const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: 1280px) {
    min-width: 394px;
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
  margin-bottom: 16px;
  padding: 4px;
  overflow: hidden;

  & img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  &.MuiButtonBase-root.MuiButton-root {
    padding: 8px 16.5px;

    @media screen and (min-width: 1280px) {
      padding: 8px 40px;
    }
  }
`;
