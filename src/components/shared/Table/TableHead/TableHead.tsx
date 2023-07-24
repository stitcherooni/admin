import React from 'react';
import { Cell, Row, StyledHead } from './TableHead.styled';

interface CellProps {
  id: string;
  label: string;
  className: string;
}

interface TableHeadProps {
  cells: CellProps[];
  className: string;
}

const TableHead = (props: TableHeadProps) => (
  <StyledHead className={props.className}>
    <Row>
      {props.cells.map((headCell) => (
        <Cell key={headCell.id} className={headCell.className}>
          <strong>{headCell.label}</strong>
        </Cell>
      ))}
    </Row>
  </StyledHead>
);

export default TableHead;
