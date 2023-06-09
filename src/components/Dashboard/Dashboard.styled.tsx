import styled from 'styled-components';
import Alert from '../Alert/Alert';

export const Wrapper = styled.div``;

export const NotificationAlert = styled(Alert)`
  &.notification {
    background-color: ${(props) => props.theme.colors.main.blue};
    color: ${(props) => props.theme.colors.main.white};
    filter: drop-shadow(2px 2px 24px rgba(122, 81, 145, 0.32));
  }

  @media screen and (min-width: 1280px) {
    padding: 10px 62.8px;
  }
`;

export const SignupAlert = styled(Alert)`
  &.signup {
    background-color: ${(props) => props.theme.colors.main.pink};
    color: ${(props) => props.theme.colors.main.white};
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.24);
    border-radius: 0px 0px 8px 8px;
  }

  @media screen and (min-width: 1280px) {
    padding: 10px 62.8px;
  }
`;
