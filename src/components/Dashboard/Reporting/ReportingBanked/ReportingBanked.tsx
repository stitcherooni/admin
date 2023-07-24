import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import {
  TableCell,
  TableContent,
  Head,
  Wrapper,
} from './ReportingBanked.styled';
import {
  Row,
  SearchBarWrapper,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { actionsOptions, bankedStatisticData, headCells, rows } from './table-data';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';

const ReportingBanked = () => {
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  // to do
  // actions
  // sorting
  // table copy
  // search
  // add button 'show test transactions'

  return (
    <Wrapper>
      <StatisticBar data={bankedStatisticData} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {' '}
            Entries
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={actionsOptions} />
          </SearchBarWrapper>
        </TableCaption>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                cells={headCells}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row) => (
                  <Row
                    key={row.id}
                  >
                    <TableCell className="row-id">
                      <p>{row.num}</p>
                    </TableCell>
                    <TableCell className="order-id" onClick={() => alert('Order details modal')}>
                      <a>{row.orderId}</a>
                    </TableCell>
                    <TableCell className="transaction-id">
                      <p>{row.transactionId}</p>
                    </TableCell>
                    <TableCell className="transaction-status">
                      <p>{row.status}</p>
                    </TableCell>
                    <TableCell className="transaction-date">
                      <p>{row.date}</p>
                    </TableCell>
                    <TableCell className="transaction-value">
                      <p>{`${row.currency}${row.value}`}</p>
                    </TableCell>
                    <TableCell className="banked-fee">
                      <p>{`${row.currency}${row.bankedFee}`}</p>
                    </TableCell>
                    <TableCell className="platform-fee">
                      <p>{`${row.currency}${row.platformFee}`}</p>
                    </TableCell>
                  </Row>
                ))}
                <Row
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell className="row-id" />
                  <TableCell className="order-id hidden" />
                  <TableCell className="transaction-id hidden" />
                  <TableCell className="transaction-status hidden" />
                  <TableCell className="transaction-date">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className="transaction-value">
                    <strong>£0.00</strong>
                  </TableCell>
                  <TableCell className="banked-fee">
                    <strong>£0.00</strong>
                  </TableCell>
                  <TableCell className="platform-fee">
                    <strong>£0.00</strong>
                  </TableCell>
                </Row>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
      </TableContent>
    </Wrapper>
  );
};

export default ReportingBanked;
