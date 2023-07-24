import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 24px 16px;
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  &.error {
    background-color: ${(props) => props.theme.colors.main.lightRed};
  }

  &.warning {
    background-color: ${(props) => props.theme.colors.main.lightYellow};
  }

  &.success {
    background-color: ${(props) => props.theme.colors.main.lightGreen};
  }

  & a {
    color: ${(props) => props.theme.colors.main.purple};

    &:hover {
      color: ${(props) => props.theme.colors.main.blue};
      transition: all 0.5s;
    }
  }
`;
