import React, { ChangeEvent, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import {
  ChangePageButton, DropdownWrapper, PaginationWrapper,
  StyledSelect, Wrapper, StyledPagination, Option,
} from './TablePagination.styled';
import ArrowDownDropdown from '../../../../assets/icons/arrow-down-dropdown';
import { theme } from '../../../../styles/defaultTheme';
import ArrowUpIcon from '../../../../assets/icons/dropdown-menu-triangle.svg';

interface TablePaginationProps {
  handleChangePage: (e: ChangeEvent<any>, page?: number) => void;
  handleChangeRowsPerPage: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
  page: number;
  pagesCount: number;
  rowsPerPage: number;
  options: number[];
}

const TablePagination = (props: TablePaginationProps) => (
  <Wrapper className="table-footer">
    <PaginationWrapper>
      <ChangePageButton
        onClick={(e) => props.handleChangePage(e, props.page - 1)}
        disabled={props.page === 1}
        data-id="prev"
      >
        PREVIOUS PAGE

      </ChangePageButton>
      <StyledPagination
        onChange={props.handleChangePage}
        count={props.pagesCount}
        hidePrevButton
        hideNextButton
        page={props.page}
      />
      <ChangePageButton
        onClick={(e) => props.handleChangePage(e, props.page + 1)}
        disabled={props.page === props.pagesCount}
        data-id="next"
      >
        NEXT PAGE

      </ChangePageButton>
    </PaginationWrapper>
    <DropdownWrapper>
      <p>Show me</p>
      <StyledSelect
        value={props.rowsPerPage}
        onChange={props.handleChangeRowsPerPage}
        MenuProps={{
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            sx: {
              '&.MuiPaper-root': {
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                border: `1px solid ${theme.colors.main.green}`,
                borderRadius: '8px',
                overflow: 'initial',
              },
              '&.MuiPaper-root::before': {
                content: `url(${ArrowUpIcon})`,
                position: 'absolute',
                top: -20,
                right: 10,
                zIndex: 0,
              },
              '& .MuiList-root.MuiMenu-list': {
                backgroundColor: theme.colors.main.white,
                borderRadius: '8px',
              },
            },
          },
        }}
        IconComponent={ArrowDownDropdown}
      >
        {props.options.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </StyledSelect>
    </DropdownWrapper>
  </Wrapper>
);

export default TablePagination;
