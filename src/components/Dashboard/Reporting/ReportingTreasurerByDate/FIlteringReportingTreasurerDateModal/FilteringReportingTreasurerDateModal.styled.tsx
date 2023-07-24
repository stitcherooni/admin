import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.main.black};
  padding: 28px 16px 28px 16px;
  overflow-x: hidden;

  & p.title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  @media screen and (min-width: 1280px) {
    width: 514px;
    padding: 40px;
  }
`;

export const Form = styled.form`
  & h4 {
    font-size: 14px;
  }

  & .button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Divider = styled.hr`
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray.gray8};
  margin: 32px 0;
  border: none;
`;

export const Row = styled.div`
  & label {
    font-weight: 400;
  }

  & .label-wrapper {
    margin-bottom: 8px;
  }

  &.last {
    margin-bottom: 24px;
  }
`;
