import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 110;
  width: calc(100% - 32px);
  max-height: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.main.black};
  font-family: ${(props) => props.theme.fonts.mainFont};
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;

  & h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  & p {
    font-size: 16px;
  }

  & .buttons-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }

  @media screen and (min-width: 1280px) {
    width: 711px;
    max-height: 700px;
    padding: 40px;

    & .buttons-wrapper {
      flex-direction: row;
    }
  }
`;

export const Form = styled.form`
  margin-top: 24px;

  & .form-row {
    margin-bottom: 16px;
  }

  & .form-message {
    margin-bottom: 8px;
  }
`;
