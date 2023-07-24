import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableContent,
  Head,
} from './LastSalesTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';

const LastSalesTable = () => {
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
                  <TableCell className="id">
                    <Link to='/'>{row.id}</Link>
                  </TableCell>
                  <TableCell className="date">
                    <p>{row.date}</p>
                  </TableCell>
                  <TableCell className="customer-name">
                    <p>{row.name}</p>
                  </TableCell>
                  <TableCell className="value">
                    <p>{`${row.currency}${row.value}`}</p>
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
    </TableContent>
  );
};

export default LastSalesTable;
