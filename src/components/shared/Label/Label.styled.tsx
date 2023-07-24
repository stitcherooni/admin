import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &.label-wrapper {
    margin-bottom: 11px;
  }

  & label {
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.colors.main.black};
    margin-right: 8px;
  }

  .icon-wrapper {
    height: 24px;
  }

  &.required::after {
    content: '*';
    position: absolute;
    top: 2px;
    right: 0;
    color: ${(props) => props.theme.colors.main.pink};
    font-size: 20px;
    font-weight: 700;
    z-index: 10;
  }
`;
