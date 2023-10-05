import styled from 'styled-components';

export const OverlayWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 110;
  width: calc(100% - 32px);
  height: calc(100% - 80px);
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
    margin-bottom: 16px;
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
    top: 50%;
    transform: translate(-50%, -50%);

    & .buttons-wrapper {
      flex-direction: row;
    }
  }
`;
