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

  @media screen and (min-width: 1280px) {
    width: 711px;
    max-height: 700px;
    padding: 40px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & strong,
  & p {
    color: ${(props) => props.theme.colors.main.black};
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
  }

  & strong {
    width: 140px;
  }

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    gap: 96px;

    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }
`;

export const Card = styled.div`
  & .row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
`;
