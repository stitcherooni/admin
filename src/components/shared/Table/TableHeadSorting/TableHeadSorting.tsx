import React from 'react';
import {
  Cell, Row, SortButton, SortButtonWrapper, StyledHead,
} from './TableHeadSorting.styled';
import TableArrowDownIcon from '../../../../assets/icons/table-arowdown-icon';
import TableArrowUpIcon from '../../../../assets/icons/table-arrowup-icon';
import { StyledCheckbox } from '../Table.styled';

interface CellProps {
  id: string;
  label: string;
  className: string;
}

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (property: string, type: 'asc' | 'desc') => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  cells: CellProps[];
  className: string;
  checkbox?: boolean;
}

const TableHeadSorting = (props: TableHeadProps) => {
  const {
    onSelectAllClick, numSelected, rowCount, onRequestSort,
  } = props;
  const createSortHandler = (property: string, type: 'asc' | 'desc') => {
    onRequestSort(property, type);
  };

  return (
    <StyledHead className={props.className}>
      <Row>
        {props.checkbox ? (
          <Cell className="checkbox">
            <StyledCheckbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
              size="small"
            />
          </Cell>
        ) : null }
        {props.cells.map((headCell) => (
          <Cell key={headCell.id} className={headCell.className}>
            <strong>{headCell.label}</strong>
            {headCell.id !== 'actions' ? (
              <>
                {/* <CustomizerMenu
                  values={{} as any}
                  handleChange={() => {}}
                >
                  <SortButton
                    disableRipple
                  >
                    <TableFilterIcon />
                  </SortButton>
                </CustomizerMenu> */}
                <SortButtonWrapper>
                  <SortButton disableRipple onClick={() => createSortHandler(headCell.id, 'asc')}>
                    <TableArrowDownIcon />
                  </SortButton>
                  <SortButton disableRipple onClick={() => createSortHandler(headCell.id, 'desc')}>
                    <TableArrowUpIcon />
                  </SortButton>
                </SortButtonWrapper>
              </>
            ) : null}
          </Cell>
        ))}
      </Row>
    </StyledHead>
  );
};

TableHeadSorting.defaultProps = {
  checkbox: true,
};

export default TableHeadSorting;
