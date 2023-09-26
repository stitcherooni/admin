import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 16px;
  box-shadow: 2px 2px 24px rgba(122, 81, 145, 0.32);
  border-radius: 8px;
  position: relative;

  @media screen and (min-width: 1280px) {
    width: 376px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  & svg {
    width: 24px;
    margin-right: 8px;
  }
`;

export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 21px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray.gray1};
`;

export const ContentWrapper = styled.div`
  padding: 0 9px 0 32px;

  & h3 {
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: 8px;
  }
`;

export const Text = styled.p`
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.gray.gray1};
  font-size: 12px;
  line-height: 18px;
  margin: 4px 0 20px 0;
`;
