import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { TableCell, TableContent, Head } from './MonthlyCustomersRegTable.styled';
import { headCells, rows } from './table-data';
import { useSortingTable } from '../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../shared/Table/Table.styled';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';

interface MonthlyCustomersRegTableProps {
  data: any;
  totalCount: number;
  totalRegistrations: number;
}

const MonthlyCustomersRegTable = (props: MonthlyCustomersRegTableProps) => {
  const table = useSortingTable(props.data);
  const { page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    table.pagination;

  return (
    <TableContent>
      <TableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
            <Head cells={headCells} className="table-head" />
            <TableBody>
              {table.visibleRows.map((row) => (
                <Row key={row.id}>
                  <TableCell className="month">
                    <p>{row.month}</p>
                  </TableCell>
                  <TableCell className="reg">
                    <p>{row.registations}</p>
                  </TableCell>
                </Row>
              ))}
              <Row>
                <TableCell className="month">
                  <strong>Total</strong>
                </TableCell>
                <TableCell className="reg">
                  <strong>{props.totalRegistrations}</strong>
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

export default MonthlyCustomersRegTable;
