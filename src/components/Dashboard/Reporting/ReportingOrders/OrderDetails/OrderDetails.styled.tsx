import styled from 'styled-components';
import { Cell } from '../../../../shared/Table/Table.styled';
import ReportingTableHead from '../../../../shared/Table/TableHead/TableHead';

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.main.black};
  padding: 28px 0 28px 16px;
  overflow-x: hidden;

  & p.title {
    font-size: 20px;
  }

  & h4 {
    font-size: 14px;
  }

  @media screen and (min-width: 1280px) {
    width: 863px;
    padding: 40px;
  }
`;

export const Card = styled.div`
  width: 434px;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.gray.gray7};
  border-radius: 8px;
  margin-top: 16px;

  &.mb {
    margin-bottom: 16px;
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
    align-items: center;
    gap: 96px;

    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 32px 0;
`;

export const OrderTable = styled.div`
  & h4 {
    margin-bottom: 8px;
  }
`;

export const Head = styled(ReportingTableHead)`
  &.table-head {
    & .row-id {
      width: 44px;
    }

    & .product-id {
      width: 116px;
    }

    & .product-name {
      width: 144px;
    }

    & .quantity {
      width: 96px;
    }

    & .price {
      width: 80px;
    }

    & .line-amount {
      width: 118px;
    }

    & .status {
      width: 180px;
      border-right: 1px solid rgba(122, 81, 145, 0.4);
    }
  }
`;

export const TableCell = styled(Cell)`
  & p.order-status {
    padding: 0 8px;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.main.white};

    &.dispatched {
      background-color: ${(props) => props.theme.colors.main.green};
    }

    &.other {
      background-color: ${(props) => props.theme.colors.main.pink};
    }
  }

  & .refund {
    color: ${(props) => props.theme.colors.main.red};
  }

  &.row-id {
    width: 44px;
  }

  &.product-id {
    width: 116px;
  }

  &.product-name {
    width: 144px;
  }

  &.quantity {
    width: 96px;
  }

  &.price {
    width: 80px;
  }

  &.line-amount {
    width: 118px;
  }

  &.status {
    width: 180px;
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.primary {
    border-color: transparent;
  }
`;
