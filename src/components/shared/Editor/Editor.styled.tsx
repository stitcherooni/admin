import styled from 'styled-components';

export const EditorWrapper = styled.div`
  & button, & span {
    font-size: 14px;
    font-family: ${(props) => props.theme.fonts.mainFont}!important;
  }

  & .tox-promotion a {
    display: none;
  }

  & .tox .tox-toolbar__group {
    padding: 0 0 0 8px;
  }

  & .editor {
    & button {
      padding: 8px 32px;
    }
  }
`;
