import styled from 'styled-components';

export const Wrapper = styled.footer`
  position: relative;
  z-index: 1;
  font-family: ${(props) => props.theme.fonts.mainFont};
  word-break: break-all;

  &::before {
    content: '';
    position: absolute;
    width: calc(100% - 72px);
    height: 1px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) => props.theme.colors.main.purple};
  }

  @media screen and (min-width: 1280px) {
    &::before {
      width: calc(100% - 144px);
    }
  }
`;

export const FooterContent = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.main.white};

  @media screen and (min-width: 1280px) {
    padding: 32px 72px;
    flex-direction: row;
  }
`;

export const Contacts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${(props) => props.theme.colors.main.black};
  font-size: 14px;
  margin-bottom: 16px;

  & img {
    height: 44px;
  }

  & h3 {
    font-size: 16px;
    margin: 24px 0 16px 0;
  }

  & ul {
    list-style-type: none;
    padding: 0;
    margin: 16px 0 24px 0;
  }

  & li {
    display: flex;
    align-items: center;
    gap: 8px;

    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }

  & a {
    color: ${(props) => props.theme.colors.main.black};

    &.email {
      text-decoration: none;
    }
  }

  @media screen and (min-width: 1280px) {
    width: 50%;
    margin-bottom: 0;

    & h3 {
      margin-top: 44px;
    }

    & ul {
      margin-bottom: 37px;
    }
  }
`;

export const CTA = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & .pta-logo {
    height: 44px;
  }

  & .stripe-logo {
    height: 41px;
    margin: 32px 0;
  }

  & .suptitle {
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray.gray4};
    margin: 8px 0 0 0;
  }

  & ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 0;
    width: 100%;
  }

  & li a {
    color: ${(props) => props.theme.colors.main.purple};
    font-size: 14px;
  }

  & button.MuiButtonBase-root.MuiButton-root {
    font-size: 14px;
    padding: 8px 24px;
  }

  @media screen and (min-width: 1280px) {
    width: 50%;

    & ul {
      flex-direction: row;
      gap: 24px;
      width: initial;
    }

    & button.MuiButtonBase-root.MuiButton-root {
      font-size: 16px;
      padding: 8px 32px;
    }

    & .suptitle {
      margin-bottom: 32px;
    }
  }
`;

export const CopyrightArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.main.purple};
  color: ${(props) => props.theme.colors.main.white};
  padding: 12px 16px;
  text-align: center;
  gap: 8px;

  & span {
    font-size: 12px;
  }

  @media screen and (min-width: 1280px) {
    padding: 15px 72px;
    height: 48px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: initial;
    gap: initial;

    &.final {
      display: flex;
    }

    & img {
      display: block;
      margin-top: 2px;
    }
  }
`;
