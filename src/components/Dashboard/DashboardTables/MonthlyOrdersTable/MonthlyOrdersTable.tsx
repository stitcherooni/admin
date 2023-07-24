import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import {
  TableCell,
  TableContent,
  Head,
} from './MonthlyOrdersTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';

const MonthlyOrdersTable = () => {
  const table = useSortingTable(rows);
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  return (
    <TableContent>
      <TableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
            <Head
              cells={headCells}
              className="table-head"
            />
            <TableBody>
              {table.visibleRows.map((row) => (
                <Row
                  key={row.id}
                >
                  <TableCell className="month">
                    <p>{row.month}</p>
                  </TableCell>
                  <TableCell className="orders">
                    <p>{row.orders}</p>
                  </TableCell>
                  <TableCell className="sales">
                    <p>{`${row.currency}${row.sales}`}</p>
                  </TableCell>
                </Row>
              ))}
              <Row>
                <TableCell className="month">
                  <strong>Total</strong>
                </TableCell>
                <TableCell className="orders">
                  <strong>0</strong>
                </TableCell>
                <TableCell className="sales">
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
  );
};

export default MonthlyOrdersTable;
