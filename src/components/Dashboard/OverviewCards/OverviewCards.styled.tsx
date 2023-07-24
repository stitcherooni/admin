import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow: hidden;
  padding-left: 16px;

  @media screen and (min-width: 1280px) {
    padding-left: 0;
  }
`;

export const List = styled.div`
  /* overflow-x: scroll; */
  scrollbar-color: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    justify-content: flex-start;
  }
`;

export const Card = styled.div`
  width: 203px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.main.white};
  border-radius: 8px;
`;

export const CardWrapper = styled.div`
  padding: 16px 0;
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.main.black};
  text-align: center;

  & p {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 8px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 24px;
  line-height: 20px;
`;
