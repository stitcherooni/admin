import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const OverlayWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 110;
  width: 320px;
  background-color: ${(props) => props.theme.colors.main.pink};
  color: ${(props) => props.theme.colors.main.white};
  font-family: ${(props) => props.theme.fonts.mainFont};
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 16px;

  & p {
    font-size: 14px;
    line-height: 16px;
    margin-right: 10px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  & h2 {
    width: calc(100% - 40px);
    font-size: 16px;
    line-height: 22px;
  }
`;
