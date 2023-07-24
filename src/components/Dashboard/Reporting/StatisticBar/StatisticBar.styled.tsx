import styled from 'styled-components';

export const Wrapper = styled.div<{ className: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px;
  background-color: rgba(15, 179, 162, 0.08);
  border-radius: 8px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Item = styled.div<{ columns: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 21px;

  & svg {
    min-width: 24px;
    width: 24px;
  }

  @media screen and (min-width: 1280px) {
    justify-content: center;
    width: ${(props) => (props.columns ? 100 / props.columns : 4)}%;
  }
`;
