import React from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableProductOrderSales.styled';
import { rows, headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';

const ReportingTableProductOrderSales = () => {
  const table = useSortingTable(rows);
  const { page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    table.pagination;

  return (
    <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
          <Head cells={headCells} className="table-head" />
          <TableBody>
            {table.visibleRows.map((row) => (
              <Row key={row.num}>
                <TableCell className="percentage">
                  <p>{`${row.percentage}%`}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="product-count">
                  <p>{row.productCount}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="percentage">
                <strong>0%</strong>
              </TableCell>
              <TableCell className="quantity">
                <strong>0</strong>
              </TableCell>
              <TableCell className="product-count">
                <strong>0</strong>
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
  );
};

export default ReportingTableProductOrderSales;
