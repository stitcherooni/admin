import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { Link } from 'react-router-dom';
import {
  TableCell,
  Head,
} from './ReportingProductTableVerticalstyled';
import {
  Row,
  TableWrapper,
} from '../../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../../shared/Table/utils';
import { headCells, rows } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';

const ReportingProductTableVertical = () => {
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  return (
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
                <TableCell className="id">
                  <Link to={`/dashboard/reporting?reportType=orders&orderId=${row.orderId}`}>{row.orderId}</Link>
                </TableCell>
                <TableCell className="booking-name">
                  <p>{row.bookingName}</p>
                </TableCell>
                <TableCell className="class-name">
                  <p>{row.className}</p>
                </TableCell>
                <TableCell className="booked-for">
                  <Link to={`/dashboard/customers?customerId=${row.customerId}`}>{row.bookedFor}</Link>
                </TableCell>
                <TableCell className="phone">
                  <p>{row.phone}</p>
                </TableCell>
                <TableCell className="email">
                  <p>{row.email}</p>
                </TableCell>
                <TableCell className="product-name">
                  <p>{row.product}</p>
                </TableCell>
                <TableCell className="price">
                  <p>{row.price}</p>
                </TableCell>
                <TableCell className="order-value">
                  <p>{`${row.currency}${row.order}`}</p>
                </TableCell>
                <TableCell className="question">
                  <p>{row.question}</p>
                </TableCell>
                <TableCell className="answer">
                  <p>{row.answer}</p>
                </TableCell>
              </Row>
            ))}
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
  );
};

export default ReportingProductTableVertical;
